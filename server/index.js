require('dotenv').config(); //gives us acces to dotenv variable
const express = require('express'); //getting express
const app = express();  //invoving express, app is our server 
const API_KEY = process.env.API_KEY; //Getting api key 
const path = require('path');
const pathToDist = path.join(__dirname, '../giphy-search/dist') // _dirname gives you an absoulte path
const serveStatic = express.static(pathToDist);

const serveGifs = async (req, res, next) => { //making a controller that fetches to the server
  const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`)
  const data = await response.json()
  res.send(data);
}
app.use(serveStatic);
app.get("/api/gifs", serveGifs)

const PORT = 8081
app.listen(PORT, () => {
  console.log(`Listing on http://localhost:${PORT}`)
})


