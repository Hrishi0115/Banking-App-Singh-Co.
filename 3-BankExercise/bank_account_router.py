from fastapi import APIRouter, HTTPException, status
from models import NewPot, Pot
from database import hash_password, load_accounts, save_accounts
import uuid

router = APIRouter()

@router.post("/new_pot", response_model=Pot, status_code=status.HTTP_201_CREATED)
async def create_pot(pot: NewPot):
    
    # account_id,
    # pot_name

    accounts = load_accounts()

    # first check if account id actually exists in the database

    account_ids = accounts['accounts'].keys()

    if pot.account_id not in account_ids:
        # account id does not exist
        raise HTTPException(status_code=400, detail="Account does not exists")
        
    # continue assuming account is unique

    pot.pot_id = str(uuid.uuid4())

    new_pot = {"pot_name": pot.pot_name,
               "pot_id": pot.pot_id,
               "balance": pot.balance,
               "transactions": pot.transactions}
    
    accounts['accounts'][pot.account_id] = new_pot

    save_accounts(accounts)

    return new_pot









