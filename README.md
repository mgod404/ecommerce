
## Run the project

1. create docker-compose.override.yml file in the root folder of the project. Paste code below

```yml
services:
  db:
    environment:
      - POSTGRES_NAME=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
  backend:
    environment:
      - POSTGRES_NAME=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - PAYPAL_WEBHOOK_ID=
      - PAYPAL_CLIENT_ID=
      - PAYPAL_CLIENT_SECRET=

```

For security reasons, I'd encourage changing $POSTGRES variables. 
The variables must have the same value in "db" service and "backend" service. 
As for the paypal related variables, follow https://developer.paypal.com/api/rest/sandbox/
if you want to use the paypal integration. 

2. In **frontend/src/** create file named "CONFIG.tsx" with the code:
```typescript
export const HOST_URL = '' 
export const API_URL = `${HOST_URL}/api/v1`
```
HOST_URL is the url your backend will be available on. If the project is run locally,
the HOST_URL will be http://127.0.0.1:8000

3. In the **frontend** folder: 
```bash
  npm install
  npm run build
```

3. In folder **api** create file **sendmail.py** and create function:
```python
def send_payment_confirmation(order):
  #Your code to handle sending emails
```

4. Configure **settings.py** file in **ecommerce** folder. 

6. In root folder
```bash
docker-compose up
```

## Test the project
1. To test frontend app, in **ecommerce/frontend** folder:
```bash
npm run test
```
