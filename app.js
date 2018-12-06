const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//This specifies there are static files in the public folder which need to be rendered in out application
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//When people go to out home route, our response is to send the /signup.html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: 'https://us19.api.mailchimp.com/3.0/lists/b0f71c4ccb',
    method: "POST",
    headers: {
      "Authorization": "Matt2 2205165b2784f37a21992a55b4ca36a0-us19"
    },
    body: jsonData
  };
  
  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(response.statusCode);
    }
  })
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
})

// API KEY
// 2205165b2784f37a21992a55b4ca36a0-us19

//List ID
// b0f71c4ccb