import mongoose from 'mongoose'
const { Schema } = mongoose

const userScheme = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: {
        type: String,
        unique: true,
        index: true
    }
})

const UserModel = mongoose.model('users', userScheme)

export default UserModel