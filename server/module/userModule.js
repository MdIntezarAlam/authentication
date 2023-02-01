import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const userSchama = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("It's not valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: [6, 'Must be at least 6, '],
        max: [8, 'Must be greater than 8 char, '],
    },
    c_password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: [6, 'Must be at least 6, '],
        max: [8, 'Must be greater than 8 char, '],
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//generate token 
//1=> schema , 2=>methods, 3=>jwt  

userSchama.methods.genterateToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, "secrete=>>>>>key", { expiresIn: "1d" })
        this.tokens = this.tokens.concat({ token })
        await this.save()
        return token
    } catch (error) {
        console.log(error)
        res.send("yaha par error hai", error)
    }
}

// //hashing password
const saltRound = 10
userSchama.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRound)
        this.c_password = await bcrypt.hash(this.c_password, saltRound)
    }
    next()
})

const User = new mongoose.model("User", userSchama)

export default User