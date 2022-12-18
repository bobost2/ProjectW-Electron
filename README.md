# What is "Project W"
A codename for a project that has no name. The goal of this project is to create a stationary bike computer that tracks the workout statistics.
It's currently split into two repositories - Arduino and Electron

# What is included in this repository
This app processes the information from the Arduino and then visualizes it using the framework [React](https://github.com/facebook/react/). 
The base for this project is [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

Also this repository previously existed as a private one in [Bitbucket](https://bitbucket.org/), but now I have moved it to GitHub.

# Is it secure?
This app is built with no security in mind. The authentication is litteraly the user id stored in the app localStorage. It's that poor, because the users currently have no password and it's build for home use. The chance of someone opening the DevTools on the tablet and modify the userId value is really low.
