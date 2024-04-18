# Bank API Exercise

We're going to build an slimmed down version of the [Monzo API](https://docs.monzo.com/).

We have the following data on our customers in `data\bank_account.json`

And we need to build an api around it to allow our customers to interact with their bank account. It will need the following functionality:

## External facing API

### Customer can see information about their account

- read balance (get)
  - by default read the main account only, but you should be able to read the pots balance with an optional/default arg.
- list pots (get)
  - pot names and ids (including main account)
- list transactions (get)
  - by default list the main accounts transactions, but you should be able to read a pot transactions with an optional/default arg.

### Customer can perform actions

- deposit into pot (from main) (put)
- withdraw from pot (into main) (put)

## Advanced: Internal API

- create_account (put)
- add_transaction (put)
- create_pot (put)
- delete_account (delete)
- delete_pot (delete)
  