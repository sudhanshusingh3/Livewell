import mongoose,{Schema} from "mongoose";

const userschema = new Schema({
fname:String,
lname:String,
uname:String,
email:String,
cnum:Number,
password:String,

});

export const User = mongoose.model("users",userschema);
