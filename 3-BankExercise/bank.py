# """To run navigate to this directory and run 'uvicorn bank:app --reload'"""
from fastapi import FastAPI, HTTPException, status
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

# login logic 

from pydantic import BaseModel
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# basic hashing mechanism 

class LoginCredentials(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(credentials: LoginCredentials):
    # load user data
    with open('accounts.json') as f:
        users = json.load(f)['users']

    # find the user by username 
    user = next((u for u in users if u['username'] == credentials.username), None)

    # if user exists and password matches
    if user and user['hashed_password'] == hash_password(credentials.password):
        # in a real application / production environment, generate a token here
        return {"message": "Login successful!"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password")

@app.get("/")
def root():
    return {'Welcome' : 'to Monzo'}