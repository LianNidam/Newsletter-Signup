//jshint esversion:6


const express =require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https =require("https");

require(".env").config();

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

  const MyAPI_KEY = process.env.API_KEY;
  const MyLIST_ID = process.env.LIST_ID;

  const url= "https://"+MyAPI_KEY+".api.mailchimp.com/3.0/lists/"+MyLIST_ID;

  const options = {
    method: "POST",
    auth: "doe:" + MyAPI_KEY
  }

const request= https.request(url, options, function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  } else{
    res.sendFile(__dirname + "/Faliure.html");
  }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/success", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000 , function(){
  console.log("server is runnig on port 3000.")
});
