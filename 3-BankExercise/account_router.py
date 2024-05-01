from fastapi import APIRouter, HTTPException, status
from models import UserAccount
from database import hash_password, load_accounts, save_accounts
import uuid


router = APIRouter()

@router.post("/register", response_model=UserAccount, status_code=status.HTTP_201_CREATED)
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
        
    # automaticaly generate a unique account id
    account.account_id = str(uuid.uuid4())

    # if username or email does not already exists - create a new user account
    new_user_account = {'username': account.username,
                    'password': hash_password(account.password),
                    'email': account.email,
                    'account_id': account.account_id}
    
    # need to fix the account_id to make it automated - doesn't need to be inputed as part of the input function - needs to be unique (+1 [previous accounts id])
    
    accounts['users'].append(new_user_account)

    accounts['accounts'][account.account_id] = {}
    
    save_accounts(accounts)
    
    return new_user_account

    # needs to return an object that matches the 'UserAccount' model
    