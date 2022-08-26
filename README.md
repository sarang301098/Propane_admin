## Quick start

1.  Make sure that you have Node.js and npm are installed.
2.  Start your project using: `npm run start`

## File Structure

```
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│ ├── favicon.ico
│ ├── index.html
│ └── manifest.json
└── src
| |__asssets
| | |__images
| | |__css
| | |__fonts
| | |__vendor
| |
| |__components
| |
| |__middlewares
| | |__middleware.ts
| |__routes
| | |__routes.ts
| |__store
| | |__UserStore
| | | |__action.enum.ts
| | | |__types.d.ts
| | | |__user.action.creators.ts
| | | |__user.action.ts
| | | |__user.reducer.ts
| | |
| | |__rootReducer.ts
| | |__store.ts
| | |__types.d.ts
| |
| |
| |__utils
| |  |__helpers
| |  |__constant
| |__services(xhr)
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
└── serviceWorker.js
└── setupTests.js
└── types.d.ts.js
```

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run lint`

ESLint command that lints all your files

### `npm run lint:fix`

ESLint command that lints and fixes all your files

### `npm run format`

Prettier command to format file with the option --write which is similar to the --fix option of ESLint. For example the following command formats every .ts or .tsx or .js or .jsx file located in a src folder
