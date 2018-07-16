# React Tic-Tac-Toe
This is a demo project, where a user can play Tic-Tac-Toe with a very clever Node.js server.

This project uses React 16.x, Node.js 8.x (LTS), and Bablyon.js 3.2.0 at present. There are plans to add more front-end renderers besides SVG (e.g., the Bablyon board is in progress), and one or two more back-end players that are more AI-like, and probabilistic in their moves.

### Installation
This set of steps currently only starts up the *dev* server, but it should suffice as a demo.
1. Make sure you have Node.js and NPM installed
2. Clone this repository.
 ```bash
 git clone https://github.com/mmatthews06/react-tic-tac-toe.git
 ```
3. Install Node modules:
 ```bash
 npm install
 ```
 4. Run the API server:
  ```bash
  npm run start:api
  ```
 5. Run the front-end:
  ```bash
  npm start
  ```
 6. If a browser does not open up immediately, navigate to [http://localhost:3000](http://localhost:3000) in a browser.

### Tests
To run the tests in watch mode:
```bash
npm test
```
To see a coverage report:
```bash
npm test:coverage
```
**NOTE**: If get an odd filesystem-related error running these tests, you may need to install `watchman` on your machine. E.g., `brew install watchman`


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
