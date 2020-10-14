# Burger Builder

This is the project built during the course [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/). It's a burger builder and order app, with a [firebase](https://firebase.google.com/) back-end for authentication and storing the orders. The initial CSS was provided by the course author, but I rewrote it as SCSS.
I already finished the course, but I will still make improvements to this app. It is still a WIP.

## Demo

[Burger Builder - Live](https://react-my-burger-574bd.web.app/)

## Technologies

|Technology|Description|
|---	|---	|
|[React.js](https://reactjs.org/)|Library used for building user interfaces based on reusable UI components.|
|[Redux.js](https://redux.js.org/)|Predictable, centralized, debuggable and flexible state container.|
|[React-Redux.js](https://react-redux.js.org/)|Bindings of Redux for React.|
|[Redux-Thunk](https://www.npmjs.com/package/redux-thunk)|Middleware for Redux that allows action creators return functions instead of actions. Used to handle asynchronous code (API Calls). This project was migrated away to Redux-Saga.|
|[Redux-Saga](https://redux-saga.js.org/)|Middleware for Redux to separate the side effects from the action creators, it's a alternative for Redux.|
|[Axios](https://github.com/axios/axios)|HTTP client based on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).|
|[Sass](https://sass-lang.com/)|CSS extension language.|
|[Firebase](https://firebase.google.com/)|Simple REST Back-end using the Realtime Database.|

## Installation

##### Install with:
```bash
yarn install
```

##### Run local development serve with:
```bash
yarn start
```
This project uses firebase as a free Back-End, I keep my `API_KEY` and `BASE_URL` as environment variables. To run this project locally, you must follow the [Back-End creation steps](#back-end-creation).

##### Run test runner in watch mode:
```bash
yarn test
```

##### Build production app:
```bash
yarn build
```

## Back-End Creation

To create the back-end for this app at firebase, follow the instructions:

1. Go to the [firebase console](https://console.firebase.google.com/).
2. Create a new firebase project.
3. Go to Realtime Database and create one (You can use any mode, in the following steps, we will setup user authentication).
4. Copy the URL showed in the top of the database. Create a file named `.env` in the root of this project and paste the database URL as `REACT_APP_FIREBASE_BASE_URL` (A example is provided at the bottom).
5. At the database, create a new resource named `ingredients` and add the following nodes to it:
    ```json
    "bacon": 0,
    "cheese": 0,
    "meat": 0,
    "salad": 0
    ```
6. Create a new resource named `orders`
7. Go to Rules Tab and use the following:
    ```json
    {
      "rules": {
        "ingredients": {
        	".read": true,
        	".write": false
        },
        "orders": {
          ".read": "auth != null",
          ".write": "auth != null",
          ".indexOn": ["userId"]
        }
      }
    }
    ```
8. Go to Authentication and set-up the Sign-in method, enable `E-mail/password`
9. Go to Project Overview and click in icon to add a Web App (the `</>` icon next to iOS and Android's icons).
10. Fill a nickname for the app, like `burger-builder`, and register the app.
11. After the registration finishes, an HTML snippet containing 2 scripts will be showed, look for the `apiKey` in the second script (the big one). 
12. Paste the `apiKey` in your `.env` file as `REACT_APP_FIREBASE_API_KEY`, the final file should look like:
    ```dotenv
    REACT_APP_FIREBASE_BASE_URL=https://test-app-1234213.firebaseio.com
    REACT_APP_FIREBASE_API_KEY=AIzaSyBCCwjTqscAMaPKS9QzM6frZXV4N21s_TX
    ```



## License
[MIT](https://choosealicense.com/licenses/mit/)
