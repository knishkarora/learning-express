const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require("bcrypt"); 
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
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
    }
    const existinguser = await userModel.findOne({email:email})
    if (existinguser) {
        return res.json({
            success: false,
            message: "user already exists"
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.create({
        username: username,
        email: email,
        password: hashPassword
    });

    res.send("Form submitted");
})

app.get("/updatde-user", async (req, res) => {
    await userModel.findOneAndUpdate({
        username: "admin"
    }, {
        username: "newAdmin"
    })
    res.send("User updated successfully");
});

app.get("/delete-user", async (req, res) => {
    await userModel.findOneAndDelet({
        username: "admin"
    });
    res.send("User deleted successfully");
});
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