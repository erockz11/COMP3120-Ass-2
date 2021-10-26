# General Workflow

Anything in the `main` branch is considered deployable.

When working on code, please create a new branch with a descriptive name, such as `implementing-api-endpoints` and then work on and commit code there.

Once you are done, created a pull request to merge changes into the `main` branch\
`Github Desktop` > `Branch` > `Create pull request` > `Create pull request (on github.com)` > `Merge pull request` > `Confirm merge` > `Delete branch`

You can ask others to review your code and have them complete the pull request.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run dev`

Runs the server in development mode using nodemon, allowing for refreshes of the server each time a change is made while running
# Application Outline

### Main Purpose

To provide users with a way to generate an activity based on certain parameters (activity type, participants, price, etc).

### Target Demographic

Bored people.

### How is it Used?

There will be a form where users can use to specify the parameters of which a randomly generated activity will adhere to. If users like the activity, they can then save it to their profile. Users can then remove an activity or mark an activity as complete on their profile. Completed activities generate points and users with the most points are displayed in descending order.

### Data sources

`https://www.boredapi.com/`

# Included in this MVP

The features included in this MVP are:

- Activity generation based on a single criteria.
- Leaderboard rankings.
- User registration.
- User authentication.
- Adding activities to a user's account.
- Completing activities adds points to a user's account.
- MongoDB integration.

# Project Breakdown

## Frontend Components

The following files are located in the `src/components` folder.

- `Activity.js`: Displays information for a single activity, passed as props.
- `ActivityForm.js`: Displays forms for filtering activity generation.
- `AddActivityButton.js`: Displays a button for a logged in user to save an activity to My Activities.
- `Leaderboard.js`: Displays score rankings of users.
- `LoginForm.js`: A form for users to login to their accounts.
- `MyActivities.js`: Displays a user's current activities.
- `Notification.js`: Displays a notification to the user.
- `Rank.js`: Displays the given user's username and their score.
- `RegisterForm.js`: A form for users to create an account.
- `UserDisplay.js`: Displays a user's username if they have logged in.

## Backend

The following files are located in the `server` folder.

- `data.js`: Contains sample data for testing and setup purposes.
- `server.js`: Contains code that handles API requests.

The following files are located in the `server/models` folder.

- `activities.js`: Handles connecting to the activities schema on MongoDB.
- `users.js`: Handles connecting to the users schema on MongoDB.

## Utilities

The following files are located in the `utils` folder.

- `for_testing.js`: Contains tests for the server functions.
- `pwcrypt.js`: Handles the hashing of user passwords.

## API endpoints
- `/api/leaderboard`: A GET request that returns data for the leaderboard.
- `/api/myactivities/:username`: A GET request that returns all activities for a user.
- `/api/register`: A POST request that registers an account to the database.
- `/api/addactivity/:username`: A POST request that adds an activity to the user's account.
- `/api/login`: A POST request that handles login.
- `/api/completeactivity`: A DELETE request that completes an activity on a user's account.
- `/api/myactivities/:id`: A DELETE request that deletes an activity.

# Next Steps

- Combine the individual frontend forms into a single form which returns an activity meeting all parameters specified. Because the API only has endpoints which return a single random activity, this might require multiple requests until a matching activity is returned.

# Summary of Team Roles/Contributions

Jaime: Frontend, Backend, Database\
Josh: Frontend, Backend, Styling\
Sahana: Frontend, Styling\
Scott: Frontend, Backend

