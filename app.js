const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const LastName = req.body.lName;
    const email = req.body.email;

    const data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: LastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/b9bf2e6c0c';

    const options = {
        method: "POST",
        auth: "lakshay1:ae60b7b7591aac7906e21c57d04b7b19-us21"

    }
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {

            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {

            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function (req, res) {

    res.redirect("/");
})

app.listen(3000, function () {

    console.log("server is running on port 3000");
})



//api key
// ae60b7b7591aac7906e21c57d04b7b19-us21

//list id
// b9bf2e6c0c