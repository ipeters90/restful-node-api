# REST Node API

A token-based REST api built with Node.js using the Express.js framework and and MongoDB (using the Mongoose ODM). This api provides a secure interface for user info retrieval, updating, new user creation and removal with all protected api endpoints.

## Install
```sh
$ git clone https://github.com/ipeters90/restful-node-api.git
```

+ Install all dependencies
```sh
$ npm install
```

+ Start the backend server
```sh
$ npm run start
```

+ Also start the Webpack development server to serve assets if needed
```sh
$ npm run dev-server
```

+ Run test to check endpoints
```sh
$ npm run test
```

+ Compile your code for production
```sh
$ npm run build
```

Available API enpoints
```sh
GET /login
POST /login
GET /Register
POST /Register
GET /api/users
GET /api/users/:user_id
PUT /api/users/:user_id
DELETE /api/users/:user_id
```

