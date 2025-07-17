const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.render("index");
    console.log("Home page accessed");
})
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("Form submitted");
})

app.get("/about", (req, res) => {
    res.send("about page");
});

app.get("/contact", (req, res) => {
    res.send("contact page");
}); 

app.listen(3000);