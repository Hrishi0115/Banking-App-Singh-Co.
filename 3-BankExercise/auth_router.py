from fastapi import APIRouter, HTTPException, status
from models import LoginCredentials
from database import hash_password, load_accounts

router = APIRouter()

@router.post("/login")
def login(credentials: LoginCredentials):
    # load user data
    users = load_accounts()["users"]

    # find the user by username 
    user = next((u for u in users if u['username'] == credentials.username), None)

    # if user exists and password matches
    if user and user['password'] == hash_password(credentials.password):
        # in a real application / production environment, generate a token here
        return {"message": "Login successful!"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password")