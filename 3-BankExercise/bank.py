"""To run navigate to this directory and run 'uvicorn bank:app --reload'"""
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

@app.get("/balance")
def read_balance():
    pass

@app.get("/pots")
def list_pots():
    pass

@app.put("/pot/{pot_id}")
def deposit_into_pot(pot_id: str, amount: float):
    pass

@app.put("/pot/{pot_id}")
def withdraw_from_pot():
    pass