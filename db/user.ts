import mongoose, {Document, Model, model, Schema} from "mongoose";
import bcrypt from 'bcryptjs';
import  jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();

const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    avatar:{
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    comparePassword: (password: string) => Promise<boolean>;
    signAccessToken: () => string;
    signRefreshToken: () => string;
};

const userSchema: Schema<User> = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "please enter your name"],
    },
    email: {
        type:String,
        required: [true, "please enter your email"],
        validate: {
            validator: function (value:string) {
                return emailRegex.test(value);
            },
            message: "please enter a valid email"
        },
        unique: true,
    },
    password: {
        type:String,
        // required: [true, "please enter your password"],
        minlength: [6, "password must be atleast 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

// hash password before saving
userSchema.pre<User>('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// sign access token
userSchema.methods.signAccessToken = function () {
    return jwt.sign({id: this.id}, process.env.ACCESS_TOKEN || '', {
        expiresIn: "5m"
    });
}

// sign refresh token
userSchema.methods.signRefreshToken = function () {
    return jwt.sign({id: this.id}, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d"
    });
}

// compare password
userSchema.methods.comparePassword = async function(enteredPass:string): Promise<boolean>{
    return await bcrypt.compare(enteredPass, this.password);
};

const UserModel: Model<User> = mongoose.model("user", userSchema);
export default UserModel;