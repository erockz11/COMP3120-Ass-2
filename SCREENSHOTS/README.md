(This readme describes the screenshots/video(s) of the application and what they show.)

-----------------------------------------------------------------------

# Overview

Within the screenshots folder there are 8 captures of our 'Bored' website to showcase it's operational flow via a storyboard layout.

The application is modelled around the 'Bored' API and allows for users to find an activity to complete based on predisposed criteria. Relying primarily on Javascript, it also includes an active leaderboard, user activities and a login/registration page. The UI has been implemented using a boilerplate Skeleton bootstrap along with some inline styling.

The website consists of 8 views all together, divided into two types. There is the 'Not Logged In' version and the 'Logged In' version. There is a navigation bar and logo that are consistent throughout all 8 views, and a log out option and logged in status that is only available when a user is logged in. When there is success or failure in the functions present, there is either a red or green alert accordingly (for example if a user selects 'show activity by participant' but does not select how many participants, a red error appears). 

-----------------------------------------------------------------------

## Version 1: Not Logged in

### Home Page (Image 1)
Displays h1 and h2 headers that introduce the viewer to the website and instruct them to utilise the page. The page has been organised using a grid layout. The next row includes a form for activity type, a selector for number of participants and a scale for price. The row below has four buttons used to generate an activity based on the above criteria. If the button is pressed (as seen in Image 5. Home (Logged In)), there is an activity generated. The text in the bottom row suggests that the activity can be saved when user is logged in.

### Leaderboard (Image 2)
Displays h1 addressing the page name. Below this is a generated list of users arranged in order of highest to lowest points scored. This view is the same whether the user is logged in or not, however the list only updated when user logs in and completes an activity.

### My Activities (Image 3)
The page only displays a h1 in the center informing the user that they are not logged in.

### Log In/Register (Image 4)
There are two forms presented one on top of the other. The top form is for existing users that are logging in. The bottom form is for new users creating login credentials. Both have the same layout and similar functionality.

-----------------------------------------------------------------------
## Version 2: Logged in

### Home Page (Image 5)
The layout and content of the home screen is the same as the logged out view, except that when an activity is generated a button appears with the option to add the activity to the user's activities page. Also, there is now a log out option and logged in status displayed (as mentioned above), which is consistent along all logged in views.

### Leaderboard (Image 6)
This page remains the same as the logged out version, however when an activity is complete it automatically adds points to the relevant user and adjusts the list accordingly.

### My Activities (Image 7)
There are two h1 headings present, one displays user activities, and the other is for completed tasks. Beside user activities there are two buttons, one to complete the activity (which then is moved to the completed list) or delete the activity. If the activity is complete, the leaderboard updates. Deletion has neither a positive nor negative effect. There is also an option to delete completed activities, as one activity cannot be completed twice. Completed activities are green in colour.

### Log In/Register (Image 8)
This page only displays a h1 informing the user that they are logged in. They may choose to log out using the universally displayed log out button, in which case the login and register forms will regenerate. 

-----------------------------------------------------------------------


