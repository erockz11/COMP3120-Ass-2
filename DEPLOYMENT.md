# Deployment

A production build of this application was created using `npm run build` and then deployed to https://shrouded-hollows-90470.herokuapp.com/ using `git push heroku master`.

The `Procfile` tells Heroku to start the application from `server.js`.

A value for the variable `MONGODB_URL` was added as a config var in Heroku settings to enable the app to properly connect to the database, as it is normally defined in the `.env` file used in development, which is not included in any git commits.

# Development

A development build of this project can be accessed by using `npm run server` (on `localhost:3001` by default). Using the `proxy` parameter in `package.json`, this build serves both the frontend and backend from a single location.

Any further deployed changes to the project must be rebuilt again using `npm build` and then pushed again to Heroku.