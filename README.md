# JWT authorization with Express.js and MongoDB
This is a simple JWT authorization with Express.js and MongoDB. 

## Getting started
1. Clone the repo
```bash
git clone git@github.com:Qwoxa/JWT-authorization.git
```

2. Go to project folder
```bash
cd JWT-authorization
```

3. Install dependencies
```bash
npm install
```

4. Rename .env_sample to .env and assign the values to the constants
```bash
mv .env_sample .env
vi .env
```

5. Start the server
```bash
npm start
``` 

## Request & Response Examples
### POST /api/user/register
Request body
```json
{
    "name": "Nick",
    "email": "qwoxa1@gmail.com",
    "password": "mypassword"
}
```

Response body
```json
{
    "_id": "5da031610db20914b472db34"
}
```

### POST /api/user/login
Request body
```json
{
    "email": "qwoxa1@gmail.com",
    "password": "mypassword"
}
```

Response body
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEwMzE2MTBkYjIwOTE0YjQ3MmRiMzQiLCJuYW1lIjoiTmljayIsImVtYWlsIjoicXdveGExQGdtYWlsLmNvbSIsImlhdCI6MTU3MDc3OTY0MiwiZXhwIjoxNTcwODA0ODQyfQ.wWK2P4pW13emYg2KypFVXRVRC30t9YGnn61jv7HK3Gg"
}
```