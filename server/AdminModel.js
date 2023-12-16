import mongoose,{Schema} from "mongoose";

const userschema = new Schema({

email:String,

password:String

});

export const Admin = mongoose.model("admin",userschema);
