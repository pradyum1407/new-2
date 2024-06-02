
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://yadavkeshu2007:14March2007@user_app.sqn6zxf.mongodb.net/form")

const registerschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})


const Register=mongoose.model("Register",registerschema)

module.exports={
    Register
}