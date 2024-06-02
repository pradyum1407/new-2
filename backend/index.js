const express = require("express")
const { Register } = require("./schema/db")
const { loginmiddleware } = require("./middleware/loginschema")
const { registermiddleware} = require("./middleware/registerschema")
const jwt = require("jsonwebtoken")
const cookieparser=require("cookie-parser")
const { jwtpass } = require("./config")
const app = express()
const cors=require("cors")
const bcrypt=require("bcrypt")
const { registerhash, loginhash } = require("./middleware/hashing")

app.use(express.json())
app.use(cors())
app.use(cookieparser())
app.use(express.urlencoded({extended:false}))

app.post("/register", registermiddleware, async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const userexist = await Register.findOne({ username: username });
      if (userexist) {
        return res.status(411).json("User already exists");
      }
      const hashpass=await registerhash(password)
      await Register.create({
        username,
        email,
        password:hashpass
      });
  
      res.status(200).send({
        msg: "User is created successfully"
      });
    } catch (error) {
      res.status(500).send({
        msg: "Internal Server Error",
        error: error.message
      });
    }
  });
  
  app.post("/login", loginmiddleware, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Register.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const isPasswordCorrect = loginhash(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = jwt.sign({ username: user.username, email: user.email }, jwtpass, { expiresIn: '1h' });
        res.cookie(token)
        res.status(200).json({
            msg: "Successfully logged in",
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})