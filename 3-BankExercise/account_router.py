from fastapi import APIRouter, HTTPException, status
from models import UserAccount
from database import hash_password, load_accounts, save_accounts

router = APIRouter()

@router.post("/create_account", response_model=UserAccount, status_code=status.HTTP_201_CREATED)
async def add_account(account: UserAccount):
    # async allows the system to move onto the next step even if a previous step hasn't finished yet
    accounts = load_accounts()

    # check if the user already exists
    users = accounts['users']
    for user in users:
        if account.username == user['username']:
            # username already exists
            raise HTTPException(status_code=400, detail="Username already exists")
        if account.email == user['email']:
            # email already in use
            raise HTTPException(status_code=400, detail="Email already in use")
        

    # if username or email does not already exists
    new_user_account = {'username': account.username,
                    'password': hash_password(account.password),
                    'email': account.email,
                    'full_name': account.full_name,
                    'account_id': account.account_id}
    
    # need to fix the account_id to make it automated - doesn't need to be inputed as part of the input function - needs to be unique (+1 [previous accounts id])
    
    accounts['users'].append(new_user_account)
    
    save_accounts(accounts)
    
    return new_user_account

    # needs to return an object that matches the 'UserAccount' model
        


