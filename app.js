const express = require("express");
const app = express();
const userModel = require("./models/user"); 
const dbConnection = require("./config/db" );



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.render("index");
    console.log("Home page accessed");
})
app.post("/submit", async (req, res) => {
    const { username, email, password } = req.body;

    await userModel.create({
        username: username,
        email: email,
        password: password
    });

    res.send("Form submitted");
})

app.get("/get-users", (req, res) => {
    userModel.find({
        username: "admin"
    }).then((users) => {
        res.send(users);
    })
})

app.get("/get-user", (req, res) => {
    userModel.findOne({
        username: "admin"
    }).then((users) => {
        res.send(users);
    })
})
app.get("/about", (req, res) => {
    res.send("about page");
});

app.get("/contact", (req, res) => {
    res.send("contact page");
}); 

app.listen(3000);