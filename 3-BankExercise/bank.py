"""To run navigate to this directory and run 'uvicorn bank:app --reload'"""
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

app = FastAPI()

# This function could eventually be replaced with actual user authentication
def get_account_data_for_user(username: str):
    # Load the account data from the JSON file
    # In a real-world application, you would have a database call instead.
    with open('bank_account.json', 'r') as f:
        accounts_data = json.load(f)
    # Here, you would normally access your user database
    # For now, we are just using the data loaded from the JSON file
    return accounts_data.get(username)

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
    
    if pot_name is None or pot_name == 'main':
         return {'balance': account_data['main_account']['balance']}
    elif pot_name in account_data:
        return {'balance': account_data[pot_name]['balance']}
    else:
        raise HTTPException(status_code=404, detail='Pot not found')

@app.get("/pots")
def list_pots():
    pass

@app.put("/pot/{pot_id}")
def deposit_into_pot(pot_id: str, amount: float):
    pass

@app.put("/pot/{pot_id}")
def withdraw_from_pot():
    pass