import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } }
);

let User;

if (mongoose.models.users) {
    User = mongoose.model('users');
} else {
    User = mongoose.model('users', userSchema);
}

export default User;
