'use strict'

// A server that uses a database. 

// express provides basic server functions
const express = require("express");

// our database operations
const dbo = require('./databaseOps');

// object that provides interface for express
const app = express();

// use this instead of the older body-parser
app.use(express.json());

// make all the files in 'public' available on the Web
app.use(express.static('public'))

// when there is nothing following the slash in the url, return the main page of the app.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

//response to GET /remainder request.
app.get('/reminder',(request, response,next)=>{
  let result= dbo.getItems().catch(function(error){
    console.log('error:',error);})
  result.then(function(answer){
  
  response.send(JSON.stringify(answer));})
 // next();
  })
  //,(request,response)=>{
 //   dbo.deletePlanned();
 // })
app.get('/week',(request, response,next)=>{
  const urlParams = new URLSearchParams(request.url);
  console.log(urlParams);
  let when=urlParams.get('/week?date');
  let act=urlParams.get('activity');
  console.log(when,act);
  let result= dbo.getWeekAct(when,act).catch(function(error){console.log('error:',error);})
  
  result.then(function(answer){
      if(answer=='refuse'){
    response.send({ message:"Refuse query because the date is too late"});
  }else{
    console.log('result is',answer);
    response.send(JSON.stringify(answer));}
  })
  })
  
 // result.then(function(answer){
  
 // response.send(JSON.stringify(answer));})
 // next();
  

// This is where the server recieves and responds to POST requests

app.post('/store', function(request, response, next) {
  console.log(
    "Server recieved a post request /store with body: ",
    request.body);
  if(request.body["scalar"]==null){
    request.body.scalar='-1'; }
  //console.log(request.body);
  dbo.addAct(request.body).catch(
  function(error) {
    console.log("error:", error);
  }
);

  response.send({
    message: "I recieved your POST request at /store"
  });
});


// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});


// call the async test function for the database
// this is an example showing how the database is used
// you will eventually delete this call.



