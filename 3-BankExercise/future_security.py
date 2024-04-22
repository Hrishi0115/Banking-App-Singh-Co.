# auth_router.py
from fastapi import APIRouter, HTTPException, status
from models import LoginCredentials
from database import hash_password, get_users
from security import create_access_token

router = APIRouter()

@router.post("/login")
def login(credentials: LoginCredentials):
    users = get_users()
    user = next((u for u in users if u['username'] == credentials.username), None)

    if user and user['hashed_password'] == hash_password(credentials.password):
        # Generate a token here in a real application
        token = create_access_token(data={"sub": user['username']})
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password")

# main.py
from fastapi import FastAPI
from auth_router import router as auth_router
from account_router import router as account_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(account_router, prefix="/account", tags=["accounts"])

# security.py
from datetime import datetime, timedelta
import jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
