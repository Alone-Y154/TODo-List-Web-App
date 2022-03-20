const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const date = require(__dirname + '/date.js');

const app = express();
const items = ["buy food","cook food","eat food"];
const workItems = [];


// represents all the local static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.get("/",(req,res)=> {

  const day = date.getDate();
  res.render("list",{listTitle: day , newListItems: items});
  // res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res) => {
    const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }
  // res.sendFile(__dirname + "/index.html");

});

app.get("/work",(req,res)=> {
  res.render("list",{listTitle: "Work List", newListItems: workItems});
});
//
// app.post("/work",(req,res) => {
//   // res.sendFile(__dirname + "/index.html");
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });


app.listen(process.env.PORT || 3000,()=> {
  console.log("server is online");
});
