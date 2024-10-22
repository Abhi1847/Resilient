
## Installation
```
npm install
```

## Development
```
npm run start
```

## Building & Deploying
```
npm run build

1. Which will compile all the necessary files to the build folder.
2. Upload the contents of the build folder to your web server's root folder.

```

## Structure
```
1. The src/ directory contains your entire application code, including CSS, JavaScript, HTML and tests.
2. components/ : contains dumb React components which depend on containers for data.
3. services/ : contains service files to connect external API for data management.
4. helper/ : contains helper service which is used in entire app commonaly, like createBrowserHistory()
5. action/reducer : contains actions and reducer to manage global store with help of redux thunk
```

## CSS
```
1. Using tagged template literals and the power of Bootstrap, 
2. Styled-components allows you to write actual CSS code to style your components. 
3. It also removes the mapping between components and styles
4. You can add external css to src/index.css file or you can create new file and attach that file in App.js
```

## JS
```

1. We bundle all your clientside scripts and chunk them into several files using code splitting where possible. 
2. We then automatically optimize your code when building for production so you don't have to worry about that.
```


## Routing
```
1. Routing via react-router
2. To add a new route, simply import the Route component and use it standalone or inside the Switch component
3. Top level routes are located in App.js.
```

## Redux
```
1. Redux Thunk can be installed by running npm install redux-thunk --save or yarn add redux-thunk in the command line
2. Because it is a Redux tool, you will also need to have Redux set up. Once installed, it is enabled using applyMiddleware() in store.js
```


## Authentication
```
1. JWT Authentication Flow for User Signup & User Login
2. Project Structure for React Hooks JWT Authentication (without Redux) with LocalStorage, React Router & Axios
3. Creating React Function Components with Hooks & Form Validation
4. React Function Components for accessing protected Resources (Authorization)
5. Dynamic Navigation Bar in React Hooks App
```


## Test
```
1. To test your application started with this boilerplate do the following:
2. Sprinkle setupTst.js files directly next to the parts of your application you want to test. (Or in test/ subdirectories, it doesn't really matter as long as they are directly next to those parts and end in .test.js)
3. Write your unit and component tests in those files.
4. Run npm run test in your terminal and see all the tests pass! (hopefully)
```

# Deployment Stratergy
```
Frontend → Amplify Application 

1. Create a feat/fix branch for every feature and fix. 
2. dev branch points to the “DEV” Environment (https://dev.d2jyz7lbhrso5z.amplifyapp.com/). 
3. feat/fix branch PR will be created to the “dev“ branch connected to Amplify Application. (Developer Implementation + Testing).
4. Create PR from dev to test connected to Amplify Application for moving the application version to the “TEST“ environment (https://test.d2jyz7lbhrso5z.amplifyapp.com/) (Tester test and report bugs). This PR will require approval by project managers.
5. Create PR from test to prod connected to Amplify Application for moving the application version to the “PROD“ environment (https://master.d2jyz7lbhrso5z.amplifyapp.com/) (Client testing). This PR will require approval by project managers.
```
"# Resilient" 
