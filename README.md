# Library System (Jan 2020)

## About

The application is a library system and was developed using HTML, CSS, JavaScript, NodeJS(Express) and SQlite. The application was developed for a web dev module at university. All of the requirements in the brief were completed, with some additional features added. The main functions of the application are shown in the GIF demos below.

## Setup

**1. Download the node modules**

npm install

**2. Prepopulate the sqlite database**

node initialise_database.js

**CAUTION!** Running this command will remove any data already stored in the database `data/library.sqlite`. It should be used with caution, only when you want to reset the Database to its initial state.

**3. Start the server**

node server.js

This will start the server running on `127.0.0.1` port `3000`.


## GIF Demos

**Adding and Searching User Profiles**

![Gif of adding/searching users](Gif1.gif)

**Updating and Removing User Profiles**

![Gif of updating/removing users](Gif2.gif)

**Adding, Searching and Removing Books From the Library**

![Gif of adding/searching/removing books](Gif3.gif)

**Adding, Searching and Removing Users Loans**

![Gif of adding/searching/removing loans](Gif4.gif)

**Website Responsiveness**

![Gif responsive website design](Gif5.gif)

