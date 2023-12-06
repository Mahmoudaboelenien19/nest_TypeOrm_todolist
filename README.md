# Nest ToDO

### :handbag: A simple RESTful API Using Nest ,TypeScript,Postgres,React and tailwind

## Features

<b>todos Features</b>

| Feature       |  Coded?  | Description                          |
| ------------- | :------: | :----------------------------------- |
| Add a todos   | &#10004; | Ability of Add a todos on the System |
| List todoss   | &#10004; | Ability of List todos                |
| Edit a todos  | &#10004; | Ability of Edit a todo               |
| Delete a todo | &#10004; | Ability of Delete a todo             |
| Check a todo  | &#10004; | Ability of Delete a todo             |

<b>Purchase Features</b>

| Feature        | Vergion |
| -------------- | :-----: |
| @nestjs/common | ^10.0.0 |
| nodejs         | v20.9.0 |
| React          | ^18.2.0 |
| TypeScript     | ^5.2.2  |

# Protected & Unprotected Routes

**User**who aren't authenticated can open home page they will be redirected to Login page and **Users**who are authenticated adn if they try to go directly to login or sign up they will be redirected to home page.

## Features

## Installation

To run this project, you need to have Node.js and PostgresQl installed on your system.

1. Clone this repository
2. Install the dependencies: `pnpm install`
3. Start the server: `pnpm start`

## Environment Variables

add these environement variables to `.env` file

- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_TEST_DB
- POSTGRES_PORT
- NODE_ENV
- BCRYPT_SALT_ROUNDS
- BCRYPT_SECRET
- JWT_SECRET
