# simple interface for the JSON file that acts as a makeshift database - in future upgrade to use database, e.g. MS SQL, MySQL, Postgre
import json
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def load_accounts():
    with open('accounts.json', 'r') as f:
        accounts = json.load(f)
    return accounts

def save_accounts(accounts):
    with open('accounts.json', 'w') as f:
        json.dump(accounts, f, indent=4)