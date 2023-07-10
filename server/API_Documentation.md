# API Documentation

### Running Program:

```
npm install
npm run dev
```

List of available endpoints:

- [`POST /costumers/register`](#1-post-costumersregister)
- [`POST /costumers/login`](#2-post-costumerslogin)
- [`POST /orders`](#3-post-orders)
- [`GET /orders`](#4-get-orders)
- [`GET /orders/:orderId`](#5-get-ordersorderid)
- [`PUT /orders/:orderId`](#6-patch-ordersorderid)
- [`DELETE /orders/:orderId`](#7-delete-ordersorderid)

&nbsp;

## 1. POST /costumers/register

Description:

- Register user

Request:

- body:

```json
{
  "username": "string",
  "email": "string (unique)",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "A new accout with email ayuaiu@mail.com has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email can not be empty"
}
OR
{
  "message": "email can not be null"
}
OR
{
  "message": "Only email allowed"
}
OR
{
  "message": "password can not be empty"
}
OR
{
  "message": "password can not be null"
}
OR
{
  "message": "Min character for password is 5"
}
```

&nbsp;

## 2. POST /costumers/login

Description:

- Login for user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 3. POST /orders

Description:

- Create an order

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "producName": "string",
  "price": "integer",
  "quantity": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "New order has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "productName can not be empty"
}
OR
{
  "message": "productName can not be null"
}
OR
{
  "message": "Invalid input"
}
OR
{
  "message": "price can not be empty"
}
OR
{
  "message": "price can not be null"
}
OR
{
  "message": "quantity can not be empty"
}
OR
{
  "message": "quantity can not be null"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 4. GET /orders

Description:

- Get orders by user login

Request:

- headers:

````json
{
  "access_token": "string"
}

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "productName": "Smart TV 50 inci",
        "quantity": 4,
        "price": 100000,
        "totalPrice": 400000,
        "CostumerId": 1,
        "createdAt": "2023-07-08T22:18:06.193Z",
        "updatedAt": "2023-07-08T22:27:06.578Z"
    }
  {....}
]

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

````

&nbsp;

## 5. GET /orders/:orderId

Description:

- Get an order by Id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "productName": "Smart TV 50 inci",
  "quantity": 4,
  "price": 100000,
  "totalPrice": 400000,
  "CostumerId": 1,
  "createdAt": "2023-07-08T22:18:06.193Z",
  "updatedAt": "2023-07-08T22:27:06.578Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 6. PATCH /orders/:orderId

Description:

- Edit an order by Id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Order with product name Smart TV has been updated"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "productName can not be empty"
}
OR
{
  "message": "productName can not be null"
}
OR
{
  "message": "Invalid input"
}
OR
{
  "message": "price can not be empty"
}
OR
{
  "message": "price can not be null"
}
OR
{
  "message": "quantity can not be empty"
}
OR
{
  "message": "quantity can not be null"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## 7. DELETE /orders/:orderId

Description:

- Delete a medicine by Id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Order with productName Smart TV has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
