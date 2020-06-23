# Nodejs-React Chat Demo

This repository contains a simple chat app.
There are no "chat rooms"/"private chats"/etc. just a simple chat where everyone can see the messages of anyone.

## Getting started
### Docker
The best way to start the app is to use docker.
Build a Docker image by using the provided Dockerfile:

    docker build -t nodejs-react-chat .
    
and then run it:

    docker run -it --rm -p 3000:3000 nodejs-react-chat
    
The app is now running and you can access it via `http://localhost:3000`

### Development without Docker
You can also start the frontend and the backend separately.
This part assumes NodeJS is installed properly.
I use NodeJS version 12.18.1 LTS at this point of time.

For the frontend go to `<projectdir>/frontend-react` and start by executing `yarn install`.
This will install all necessary dependencies for you.
Next use `yarn run build` to build the frontend. The artifacts will be generated next to the backend, so the backend
can serve the frontend easily.
Additionally, there is a possibility to run a hot-reload server provided by webpack-dev-server.
Run `yarn run start` and a browser should open up at `http://localhost:8080/webpack-dev-server/`  

To make the chat app display messages, you also need to run the backend.
Go to `<projectdir>/backend-node` and execute `node index.js` to start the server.

## Features

- [x] Functional chat
  - [x] Your own messages are displayed on the right of the screen 
  - [x] Other messages will be displayed on the left   
- [x] Whenever there is a new message, the chat will scroll to the bottom to display the message automatically
- [x] A preferences page with the following options:
  - [x] Change username 
  - [x] Choose interface color: light and dark mode are provided
  - [x] Choose clock display option: 12hour mode (AM/PM) and 24hour mode are provided
  - [x] Choose option to send message on Ctrl+Enter: On or off
  - [x] Language options: Currently English and German are supported
  - [x] Reset to defaults button
  - [ ] Preferences are saved to local-storage 

## Miscellaneous

Since this app was written for an assignment here is a copy of the requirements:
- [x] You have to use React as your framework
- [x] You have to use CSS preprocessors
- [x] You have to write the app in TypeScript;
- [x] It should work on every desktop and phone, so you have to make responsive
design. And it has to work both portrait and landscape orientation;
- [x] It should work on desktop/tablet/phone at least on the following browsers:
Chrome, Firefox and Safari. Consider the latest versions for each browser;
- [x] Please, do not use any tool like or similar to create-react-app;
- [ ] Write at least some tests that would cover the main functionality of your app. We do not expect to be 100% test covered;
- [x] Write clean, commented, small and modularized code;
- [x] Working code, that works if we serve it with the http server and open in a
browser;
- [x] README file that contains:
    - [x]  What is it;
    - [x] How does it work;
    - [x] How could we setup and run it;
    - [x] Create a checkbox list of all the features required by this homework and check the ones you were able to accomplish;
