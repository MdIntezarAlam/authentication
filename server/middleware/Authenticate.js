
import User from '../module/userModule.js'
import jwt from 'jsonwebtoken'

export const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization; //auth ka name small rakhna hai
        // console.log("AuthenticatedTokens", token)

        //if token is found then verify it
        const verifyToken = jwt.verify(token, "secrete=>>>>>key")
        // console.log("varifyToken", verifyToken)
        //after than send it to the  Module
        const rootUser = await User.findOne({ _id: verifyToken._id })
        // console.log("rootUser", rootUser)
        //to check rootToken is not eixst
        if (!rootUser) {
            throw new Error("user not found")
        }


        //if evrything is exist then send it the User module

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        //finally call next
        next()
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: "unauthorized user "
        })
    }
}
