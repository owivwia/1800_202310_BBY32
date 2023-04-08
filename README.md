# Project Title

## 1. Project Description 
This browser-based web application was made to ease anxiety and combat boredom indoors through the encouragement of physical and creative activities during extreme weather conditions.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Olivia and I'm excited for what's to come in my time here at BCIT
* Hi my name is Samuel. I am so very much excited to embark on this journey called CST!!!!!!!!!!!!!
* Hi, I'm Jeffery! Let's do this!!
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Weather API from OpenWeatherMap (To display live temperature in user's city )
* Geocoding API from OpenWeatherMap (To display user's current location )


## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
1. Register an account on the login page. 
2. See the tasks given for the day and complete them.
3. Once finished, upload an image of the task done into the upload page.
4. Check out other peoples post in the feed page, or your own posts in the gallery page.

## 5. Known Bugs and Limitations
Here are some known bugs/limitations:
* Hamburger menu doesn't minimize once expanded.
* ...

## 6. Features for Future
What we'd like to build in the future:
* A Task History page that shows the user all the tasks that they've already completed and when they completed it.
* Background that changes according to different weather conditions.
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to URL
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /snowbackground.jpg      # App background image
    /image.jpg               # Default LOGO
    /snowflake.ico           # Favicon
    /snowflake.png           # PNG of Favicon
    /icons                   # Folder w icons for Weather API

├── scripts                  # Folder for scripts
    /firebaseAPI_TEAM32.js   # Firebase API stuff 
    /authentication.js       # Check if user is logged in or not
    /client.js               #
    /eachUpload.js           # Retreive individual post data from database
    /feed.js                 # Retreive all posts from database
    /gallery.js              # Retreive all user's posts from database
    /location.js             # API to retreive user's live location
    /main.js                 # Retreive tasks from database
    /profile.js              # Retreive user data from database
    /script.js               # When user logs out from account
    /skeleton.js             # Loads navbar and footer into every page
    /temperature.js          # API to retreive current temperature in city
    /upload.js               # When user uploads images to post
    
├── styles                   # Folder for styles
    /style.css               # style for the app

├── text                     # Folder for navbar and footer
    /footer.html             # HTML file for footer
    /nav_after_login         # HTML file for navbar after login
    /nav_before_login        # HTML file for navbar before login

├── completed.html           # HTML page for completed tasks (not implemented)
├── eachUpload.html          # HTML page for viewing individual posts
├── faq.html                 # HTML page for About us/FAQ page
├── feed.hmtl                # HTML page for viewing public feed
├── gallery.html             # HTML page for viewing user's posts
├── login.html               # HTML page for logging into user account
├── main.html                # HTML page for viewing live weather data and tasks
├── profile.html             # HTML page for viewing user information
├── upload.html              # HTML page for uploading images


```


