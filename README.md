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

There will be a form with drop down tables that users can use to specify the parameters of which a randomly generated activity will adhere to. If users like the activity, they can then save it to their profile. Users can then remove an activity or mark an activity as complete on their profile. Completed activities generate points and users with the most points are displayed in descending order.

### Data sources

`https://www.boredapi.com/`

# Included in this MVP

(A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved)

# Project Breakdown

(A guide to the project source code - where should we look for what you have done)

## Components

All components are located in the `components` folder.

- `Activity.js`: Displays information for a single activity, passed as props.
- `ActivityForm.js`: Displays forms for filtering activity generation.
- `AddActivityButton.js`: Displays a button for a logged in user to save an activity to My Activities.
- `Leaderboard.js`: Component that displays score rankings of users.
- `LoginForm.js`: Form for users to login to their accounts.
- `MyActivities.js`: Component that displays a user's current activities.
- `Notification.js`: Component that displays a notification to the user.
- `Rank.js`: Displays the given user's username and their score.
- `RegisterForm.js`: Form for users to create an account if they do not already have one.
- `UserDisplay.js`: When a user logs in successfully, their username is displayed by this component.

## Functions

A list of functions, location and what they do 

- `userLogin()`: function that logins in a user, located in `App.js`
- `userLogout()`: function that logs out a user, located in `App.js`
- `userRegister()`: function that registers a new user, located in `App.js`

## Other Files

- `App.js`: The main file of the App.
- `server.js`: Backend express server.
- `services.js`: Handles HTTP requests made in the App through to the backend server.
- `get_activities.rest`: File for sending http requests to test the server api endpoints. Located in the `requests` folder under root.
- `login_tests.rest`: File for sending http requests to test the login api endpoint. Located in the `requests` folder under root.

# API endpoints
- `/api/myactivities/:user`: A GET request that returns all of the users saved activities.
- `/api/addactivity/:user`: A POST request that adds an activity that the users wants to save to their activities list.
- `/api/login`: A POST request that handles the login function of this application.

# Next Steps

(A summary of what your next steps would be if you were to continue the project)

- Combine the individual frontend forms into a single form which returns an activity meeting all parameters specified. Because the API only has endpoints which return a single random activity, this might require multiple requests until a matching activity is returned.

# Summary of Team Roles/Contributions

(A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project)