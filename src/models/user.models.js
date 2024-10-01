import mongoose from 'mongoose'
const { Schema } = mongoose

const userScheme = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    }
})

const UserModel = mongoose.model('users', userScheme)

export default UserModel