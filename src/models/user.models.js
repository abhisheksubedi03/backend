import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true   //for searching feild make index true. it optimizes
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname:{
            type: String,
            required: true,
            trim: true,
            index: true 
        },
        avatar:{
            type: String, //cloudanary url
            required: true,
        },
        coverimage:{
            type: String  //cloudnary url
        },
        watchHistory:[
            {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'password is required']
    },
    refreshToken:{
        type: String
    }
    },
    
    {
        timestamps:true
    }
)


export const  User = mongoose.model("User",userSchema)