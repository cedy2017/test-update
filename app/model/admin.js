module.exports = app => {
    const mongoose = app.mongoose;
    const AdminSchema = new mongoose.Schema({
        email: { type: String },
        username: { type: String },
        password: { type: String },
        createTime: { type: Number },
        updateTime: { type: Number }
    })

    return mongoose.model('Admin', AdminSchema);
}
