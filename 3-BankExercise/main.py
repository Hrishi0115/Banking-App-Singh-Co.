from fastapi import FastAPI
from auth_router import router as auth_router
from account_router import router as account_router
from bank_account_router import router as bank_account_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins from localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(account_router, prefix="/account", tags=["accounts"])
app.include_router(bank_account_router, prefix="/pot", tags=["bank_accounts"])


