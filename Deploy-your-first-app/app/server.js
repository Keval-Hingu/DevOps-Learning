// Write a basic server.js file:
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//Make more routes as health-point or others:
// Make a health check endpoint
// Can be used by deployment platforms to check app status
//use json response for health check

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
}   
);

app.get('/home', (req, res) => {
  res.sendFile(path.resolve('index.html'));
}
);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}   
);

//can you build the route where the html page is served?



// To run the server, use the command: node server.js
// Make sure to install express using: npm install express  
// You can then deploy this app to a platform like Heroku, AWS, or any other cloud service.