module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        firstName: { type: String },
        fbId: {type: String },
        lastName: { type: String },
        password: { type: String },
        email: { type: String },
        resetPassStr: { type: String },
        resetPassTime: { type: Number },
        createTime: { type: Number },
        updateTime: { type: Number }
    })

    return mongoose.model('User', UserSchema);
}