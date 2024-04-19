# """To run navigate to this directory and run 'uvicorn bank:app --reload'"""
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins from localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# This function could eventually be replaced with actual user authentication
def get_account_data_for_user(username: str):
    # Load the account data from the JSON file
    # In a real-world application, you would have a database call instead.
    with open('bank_account.json', 'r') as f:
        accounts_data = json.load(f)
    # Here, you would normally access your user database
    # For now, we are just using the data loaded from the JSON file
    return accounts_data.get(username)

@app.get("/")
def default():
    return {'Welcome to': 'Monzo'}

@app.get("/balance/{username}")
def read_balance(username: str, pot_name: Optional[str] = None):
    """Retrives the balance of the main account or a specified pot.

    Args:
        account_data (_type_): _description_
        pot_name (_type_, optional): _description_. Defaults to None.
    """
    account_data = get_account_data_for_user(username)
    if account_data is None:
        raise HTTPException(status_code=404, detail='User not found')
    
    if pot_name is None:
         return {'balance': account_data['main_account']['balance']}
    elif pot_name in account_data:
        return {'balance': account_data[pot_name]['balance']}
    else:
        raise HTTPException(status_code=404, detail='Pot not found')

# implemented various API endpoints for various use cases

@app.get("/pots/{username}")
def list_pots(username: str):
    account_data = get_account_data_for_user(username)
    if account_data is None:
        raise HTTPException(status_code=404, detail='User not found')
    
    # list all pots including main account 

    dict_of_pots = {}
    for key, value in account_data.items():
        if type(value) == dict and 'pot_id' in value.keys():
            dict_of_pots[key] = value['pot_id']
        
    return dict_of_pots
    
@app.get("/transactions/{username}")
def list_transactions(username: str, pot_name=None):

    account_data = get_account_data_for_user(username)
    if account_data is None:
        raise HTTPException(status_code=404, detail='User not found')

    dict_of_transactions = {}
    # main account logic
    if pot_name is None:
        transactions = account_data['main_account']['transactions']
        for transaction in transactions:
            dict_of_transactions[transaction['id']] = {'amount': transaction['amount'], 'note': transaction['note']}
    elif pot_name in account_data:
        transactions = account_data[pot_name]['transactions']
        for transaction in transactions:
            dict_of_transactions[transaction['id']] = {'amount': transaction['amount'], 'note': transaction['note']}
    else:
        raise HTTPException(status_code=404, detail='Pot not found')

    return dict_of_transactions

# GET /balance/Peter%20Pan?pot_name=rainy_day_pot

@app.put("/pot/{pot_id}")
def deposit_into_pot(pot_id: str, amount: float):
    pass

@app.put("/pot/{pot_id}")
def withdraw_from_pot():
    pass