import User from "../module/userModule.js"
import bcrypt from 'bcryptjs'
import { Authenticate } from "../middleware/Authenticate.js"

export const userRegister = async (req, res) => {
    try {
        const { name, email, password, c_password } = req.body

        if (!name || !email || !password || !c_password) {
            return res.status(401).json({
                success: false,
                message: "All field is required"
            })
        }

        const user = await User.findOne({ email: email })
        if (user) {
            res.status(402).json({
                success: false,
                message: "Email is already exist"
            })
        } else if (password !== c_password) {
            return res.status(402).json({
                success: false,
                message: "password is not match"
            })
        } else {
            const finalUser = new User({ name, email, password, c_password })
            const storedData = await finalUser.save()

            res.status(200).json({
                success: true,
                message: "user registerd successfully",
                storedData
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(421).json({
                success: false,
                message: "All field is erquired"
            })
        }

        const preUser = await User.findOne({ email })

        if (!preUser) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, preUser.password)
        const token = await preUser.genterateToken()

        const cookieOption = {
            expires: new Date(Date.now() + 80 * 44 * 60 * 60 * 1000),
            httpOnly: true
        }

        if (isMatch) {
            return res.status(200).cookie("userToken", token, cookieOption).json({
                success: true,
                status: 200,
                message: " user loginned",
                preUser,
                token
            })
        }

        else {
            return res.status(404).json({
                success: false,
                message: "Invalid login details"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//valiuser
export const validUsers = async (req, res) => {
    //   console.log("done");
    try {
        const validUserOne = await User.findOne({ _id: req.userId })
        res.json({
            status:200,
            validUserOne
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}