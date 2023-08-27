# ProfileStore | MERN
A MERN stack app for storing profile links of people you admire, at one place.

## Built Using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [useState hook & props](https://reactjs.org/docs/hooks-state.html) - For state management
- [React Router](https://reactrouter.com/) - For general routing & navigation

#### Back-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Validator.js](https://www.npmjs.com/package/validator) - For validation of JSON data
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file


## Usage

#### Env variable:

Create .env file in server directory and add the following:

```
MONGO_URI = "Your Mongo URI"
PORT = 4000
SECRET = "Your JWT secret"
```

#### Client:

```
cd frontend
npm install
npm start
```

#### Server:

Note: Make sure that you have installed 'nodemon' as global package.

```
cd backend
npm install
npm run dev
```
