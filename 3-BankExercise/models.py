# Module to contain all Pydantic models
from pydantic import BaseModel

class LoginCredentials(BaseModel):
    username: str
    password: str

class Transaction(BaseModel):
    amount: float
    id: str
    note: str

class BankAccount(BaseModel):
    pot_id: str
    balance: float
    transactions: list[Transaction]

class UserAccount(BaseModel):
    username: str
    password: str
    email: str
    full_name: str
    account_id: str

