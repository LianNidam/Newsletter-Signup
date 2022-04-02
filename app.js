//jshint esversion:6


const express =require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https =require("https");


const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName= req.body.fName;
  const lasttName= req.body.lName;
  const email= req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lasttName
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url= "https://us14.api.mailchimp.com/3.0/lists/87557e7fb6";

  const options = {
    method: "POST",
    auth: "Lian:cdee1f1d875be1a61df1299dc49ad2c4-us14"
  }

const request= https.request(url, options, function(response){

  if(response.statusCode === 200){
    res.send("Successfully subscribed!");
  } else{
    res.send("There was an error with signing up, please try again!");
  }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();


});


app.listen(3000, function(){
  console.log("server is runnig on port 3000.")
});


//api key
//cdee1f1d875be1a61df1299dc49ad2c4-us14

//list Id
//87557e7fb6
