# Module to contain all Pydantic models
from pydantic import BaseModel

class LoginCredentials(BaseModel):
    username: str
    password: str

class Transaction(BaseModel):
    amount: float
    id: str
    note: str

# class BankAccount(BaseModel):
#     pot_id: str
#     balance: float
#     transactions: list[Transaction]

class UserAccount(BaseModel):
    username: str
    password: str
    email: str
    account_id: str = None

class NewPot(BaseModel):
    account_id: str
    pot_name: str
    pot_id: str = None
    balance: int = 0
    transactions: list[Transaction] = []

class Pot(BaseModel):
    pot_name: str
    pot_id: str
    balance: int
    transactions: list[Transaction] 
