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

Runs the server in development mode using nodemon
Allowing for refreshes of the server each time a change is made while running
# Application Outline

(An outline of the application you were aiming to build, target users, data sources etc (similar to the proposal))

# Included in this MVP

(A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved)

# Project Breakdown

(A guide to the project source code - where should we look for what you have done)

## Components

All components are located in the `components` folder.

- `Activity.js`: Displays information for a single activity, passed as props.
- `Leaderboard.js`:
- `LoginForm.js`: Form for users to login to their accounts.
- `MyActivities.js`:
- `RegisterForm.js`: Form for users to create an account if they do not already have one.
- `UserDisplay.js`: When a user logs in successfully, their username is displayed by this component.

## Functions

A list of functions, location and what they do 

- `userLogin()`: function that logins in a user, located in `App.js`
- `userLogout()`: function that logs out a user, located in `App.js`
- `userRegister()`: function that registers a new user, located in `App.js`

## Other Files

- `App.js`:
- `server.js`: Backend express server.
- `get_activities.rest`: File for sending http requests to test the server api endpoints. Located in the `requests` folder under root.

# API endpoints
- `/api/myactivities/:user`: A GET request that returns all of the users saved activities
- `/api/addactivity/:user`: A POST request that adds an activity that the users wants to save to their activities list

# Next Steps

(A summary of what your next steps would be if you were to continue the project)

# Summary of Team Roles/Contributions

(A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project)