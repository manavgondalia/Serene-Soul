![readme_heading](https://github.com/manavgondalia/Serene-Soul/assets/72291135/0e7a969c-1985-4763-94c7-56216c121897)

SereneSoul is a web-based student friendly platform to collect responses to mental health survey.

Working demo can be found in [this](https://www.youtube.com/playlist?list=PLKj0qGKiBBMy9Ztot2xXHZ-Tt9AfLJvQq) YouTube playlist.

## Technologies Used

**Server Side:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**Client Side:** 

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![rrd](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


**Database:** 

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Features

1. Anonymous data collection: To ensure data privacy.
2. Confidential access and retrieval of data: Only the faculty advisor alloted to the student can see the response unlike GForms where anyone with the spreadsheet link has access to the data.
3. Dynamic administration: GUI based addtion of faculty advisors and/or new questions.
4. Hirearchy in data: 3 roles (PIC, Faculty Advisor and Student) for efficient user management.
5. Pleasing UI: For user retention.

## Usage

Clone this repository and navigate to the project folder.

```bash
git clone https://github.com/manavgondalia/Serene-Soul.git
cd Serene-Soul
```


### Run the server

1. Navigate to the server directory using the command `cd mental-health-server`.
2. Install the dependencies using the command `npm install`.
3. Start the server in development mode with hot reloading using the command `nodemon server.js`.
4. The server will be hosted on the port number displayed on the terminal (can be changed with `.env` files).

### Run the client-side

1. Navigate to the client directory from the parent directory using the command `cd mental-health-client`.
2. Install the dependencies using the command `npm install`.
3. Start the app using the command `npm run start`.
4. The app can be accessed on the port number displayed on the terminal.
