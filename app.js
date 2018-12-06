const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

//When people go to out home route, our response is to send the /signup.html file
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
})


