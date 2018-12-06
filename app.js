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
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: 'https://us19.api.mailchimp.com/3.0/lists/b0f71c4ccb',
    method: "POST",
    headers: {
      "Authorization": `Matt2 ${APIKEY}`
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html")
      console.log(response.statusCode);
      console.log(error);
    }
    else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
      console.log(response.statusCode);
    } else {
      res.sendFile(__dirname + "/failure.html")
      console.log(response.statusCode);
    }
  })
});

app.post('/failure', function (req, res) {
  res.redirect('/');
})

app.listen(3000, function () {
  console.log("Listening on port 3000");
})
