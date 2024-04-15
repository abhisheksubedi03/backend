import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asynchandler( async (req, res) =>{
    //get user details from frontend
    //validation- not empty
    //check user exist or not
    //check for avatar, images i.e all required feilds
    //upload to cloudnary
    //create user object-  create entry in db
    //remove password and refresh token field from response
    // check for user creation
    // return response 

    const {fullName, email , username, password }=req.body
   // console.log("email: ", email);
    if (
        [fullName, email, username, password].some((field) => 
    field?.trim() ==="")
    ) {
        throw new ApiError(400, "all feilds are required")
    }

   const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser)
    {
        throw new ApiError(409,"user with email or username exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalpath = req.files?.coverImage[0]?.path;

    let coverImageLocalpath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) {
        coverImageLocalpath = req.files.coverImage[0].path
        
    }

    if (!avatarLocalPath) {
        throw new ApiError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)

    if (!avatar) {
        throw new ApiError(400,"avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"something went wrong when registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
    )



})

export { registerUser }
