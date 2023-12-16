import express, { request, response } from "express";
import mongoose from "mongoose";
import { User } from './UserModel.js';
import { Admin } from './AdminModel.js';
import cors from "cors";



const app = express()
app.use(express.json())
app.use(cors())
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/livwell')
        console.log("Database connection created!")
    } catch (error) {
        console.log(error)
    }
}

app.post('/signup', async (request, response) => {
    try {
        const reqData = request.body;
        const u = new User(reqData);
        await u.save();
        response.send({ message: "user inserted" })
    } catch (error) {
        response.send({ message: "Something went wrong" })
    }

})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are valid
    // If valid, return a JWT token
    // If invalid, return an error message
    User.findOne({ email: email }).then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Sucesss")
            } else {
                res.json("the password is incorrect")

            }
        } else {
            res.json("No record existed")
        }


    })

});

app.post('/adminsignup', async (request, response) => {
    try {
        const reqData = request.body;
        const u = new Admin(reqData);
        await u.save();
        response.send({ message: "user inserted" })
    } catch (error) {
        response.send({ message: "Something went wrong" })
    }

})

app.post('/adminlogin', async(req, res) => {
    const { email, password } = req.body;

    await Admin.findOne({ email: email }).then(admin => {
       
        if (admin) {
            if (admin.password === password) {
                res.json("Sucesss")
            } else {
                res.json("the password is incorrect")

            }
        } else {
            res.json("No record existed")
        }


    })

});


app.get('/userdetails', async (request, response) => {

    try {
        const userdetail = await User.find();
        response.send({ userdetail: userdetail })
    } catch (error) {

        response.send({ message: "Something went wrong" })
    }

})


app.delete("/userdelete",async(request,response)=>{
    try{
        const { email, password } = request.body;
        await User.deleteOne({email:email})
        response.send({message:"User Deleted"})
    }catch(error){
        response.send({message:"In Catch block"})
    }
})

app.put("/userupdate",async(request,response)=>{



})



app.listen(4000, () => {
    console.log("Server started 4000")
    connectDB();
})

