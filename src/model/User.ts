import mongoose,{Schema,Document} from "mongoose";

//made a  interface for message as it will induce type safety when making a message schema and will also help in other schermmas too
export interface Message extends Document{
    content:string,
    createdAt:Date
}
//Schemma for message by using the above interface
const messageSchemma:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

//made a anouther interface for user as it will induce type safety when making a user schema and will also help in other schemmas too
export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string
    verifyCodeExpiry:Date,
    isAcceptingMessage:boolean,
    isVerified:boolean,
    messages:Message[]
    createdAt:Date
}

//User schemma using user Interface ,you can give type of Schemma and under give it the user type ,now it becomes Schemma-->User type
const userSchemma:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email :{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:true
    },
    isAcceptingMessage:{
        type:Boolean,
        required:true,
        default:true
    },
    messages:[messageSchemma],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }

})

//EXPORTINF USERMODEL
 const UserModel=mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",userSchemma);

 export default UserModel;
