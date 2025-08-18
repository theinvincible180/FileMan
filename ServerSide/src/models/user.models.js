import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type : "String",
        required : true,
    },
    userName : {
        type : "String",
        required : true,
    },
    password : {
        type : "String",
        required : true,
    },
    email : {
        type : "String",
        required : true,
    },
    profilePic : {
        type : "String",
        default : "default.png",
    },
    totalUploads : {
        type : "Number",
        default : 0,
    },
    totalDownloads : {
        type : "Number",
        default : 0,
    },
    documentCount : {
        type : "Number",
        default : 0,
    },
});

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;