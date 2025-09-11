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
    files: [{
        type: String,
        required: true
    }],
    documentCount : {
        type : "Number",
        default : 0,
    },
    limit:{
        type: "Number",
        default: 15 * 1024 * 1024,
    },
    memoryLimit:{
        type: "Number",
        default: 50 * 1024 * 1024,
    },
    memoryUsed: {
        type: "Number",
        default: 0,
    },
    imageCount: {
        type: "Number",
        default: 0,
    },
    videoCount: {
        type: "Number",
        default: 0,
    },
    documentCount: {
        type: "Number",
        default: 0,
    }
}, {timestamps: true});

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);
export default User;