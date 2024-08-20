# project setup

download project and run the following instructions:

## to install necessary modules:

run: 
> npm i

## to setup your database:

change informations in ".env", file guiding example on .env.example, as below:

> DATABASE_URL="yoursql://username:password@localhost:1234/mydb?schema=public"

> PORT=3000

> JWT_SECRET=secretkeygoeshere

*JWT_SECRET does not really matter what the key is, it should be something hard to decode, however.

## to run the project:

start the project by running:

> npm start

nodemon should start file located at ./src/index.ts
the message "App is Running!" is going to be sent in console

## to test:

the current features of the projects currently are:

"login" -> POST request -> receives email and password and tries to find it in database,
if it is found returns the user information and an authorization token,
if it is not found returns error message.

"singup" -> POST request -> receives email, password and username and tries to save it in database,
in case there is already a registered account under the email returns error message,
in case there is missing information returns error message.

"me" -> GET request -> receives an auth token from the header,
headers should contain a header by the name "authorization"
containing the token that is returned by the login function.