const crypto = require('crypto');
const uuidV4 = require('uuid/v1');
module.exports = app => {
    class Auth extends app.Controller {
        * init() {
            let ctx = this.ctx;
            let adminModel = ctx.model.Admin;
            let count = yield adminModel.count();
            if (count > 0) {
              return ctx.body = "Illegal access.";
            }
            let initAdmin = adminModel({
              username: "radicasys",
              password: crypto.createHash('sha1').update("admin@2017").digest('hex')
            });
            yield initAdmin.save();
            return ctx.body = "Initialization is complete.";
        }
        logout() {
            this.ctx.session = null
            this.ctx.body = JSON.stringify({code: 0, message: ""});
        }

        * FBLogin() {
            let ctx = this.ctx;
            let userModel = ctx.model.user;
            let { fbId, firstname, lastname, email } = ctx.request.body;
            console.log(ctx.request.body);
            if(!fbId) {
                return ctx.body = JSON.stringify({ code: 1, message: "Incomplete information" });
            }
            let user;
            try {
                user = yield userModel.findOne({ fbId });
                if (!user) {
                    let time = Date.now();
                    user = ctx.model.user({
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        fbId: fbId,
                        password: crypto.createHash('sha1').update(uuidV4()).digest('hex'),
                        createTime: time,
                        updateTime: time
                    });
                    yield user.save();
                }
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }
            let attendModel = ctx.model.attend;
            let attends;
            try {
                attends = yield attendModel.find({ attended: true }, "_id title eventId").sort({createTime: 'desc'}).limit(1);
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }

            let systime = Date.now();
            let session = ctx.session;
            ctx.session.user = user;
            return ctx.body = JSON.stringify({code: 0, message: "Login success", data: user, albumTitle: attends[0] ? attends[0].title : ''});
        }

        * adminLogin() {
          let ctx = this.ctx;
          let { username, password } = ctx.request.body;
          let adminModel = ctx.model.Admin;
          let exist;
          try {
              exist = yield adminModel.findOne({ username, password: crypto.createHash('sha1').update(password).digest('hex') });
          } catch(e) {
              ctx.body = JSON.stringify({
                code: 1,
                message: e.toString()
              });
          }
          if(!exist) {
              return ctx.body = JSON.stringify({code: 1, message: "User or Password not correct"});
          }
          let session = ctx.session;
          ctx.session.admin = exist;
          ctx.body = JSON.stringify({code: 0, message: "login success"});
        }

        * forgotPassView() {
            let ctx = this.ctx;
            yield ctx.render('forgotpass.tpl.html');
        }
        * forgotPassSendMail() {
            let ctx = this.ctx;
            let { email } = ctx.request.body;
            let userModel = ctx.model.user
            let user;
            try {
               user = yield userModel.findOne({ email: email });
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }
            if(!user) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: `Can not find user email '${email}'`
                });
            }

            user.resetPassStr = uuidV4();
            user.resetPassTime = Date.now()

            try {
                yield user.save()
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }

            let resStr = JSON.stringify({
                email: email,
                str: user.resetPassStr
            });

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'radica0149@gmail.com',
                    pass: 'radicasys'
                }
            });
            let mailOptions = {
                from: '"Event System" <radica0149@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Reset Passworld', // Subject line
                text: `Your password has been reset to /newpass/${encodeURIComponent(resStr)}`, // plain text body
                html: `Your password has been reset to ${app.config.baseUrl}/newpass/${encodeURIComponent(resStr)}` // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            ctx.body = JSON.stringify({
                code: 0,
                message: ""
            });
        }
        * newPass() {
            let ctx = this.ctx;
            let idstr = ctx.params.idstr
            let resStr = decodeURIComponent(idstr);
            let resObj;
            try {
                resObj = JSON.parse(resStr);
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: "Invalid url."
                });
            }
            let userModel = ctx.model.user;
            let user;
            try {
                user = yield userModel.findOne({ email: resObj.email })
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }
            if (resObj.str !== user.resetPassStr) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: "Invalid url."
                });
            }
            if (Date.now() - user.resetPassTime > 24 * 60 * 60 * 1000) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: "Reset password url expired."
                });
            }
            let { newPass } = ctx.request.body;
            if(newPass.length < 6) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: "Password require at lease 6 character."
                });
            }
            user.password = crypto.createHash('sha1').update(newPass).digest('hex');
            user.resetPassStr = "";
            try {
                yield user.save()
            } catch(e) {
                return ctx.body = JSON.stringify({
                    code: 1,
                    message: e.toString()
                });
            }
            ctx.body = JSON.stringify({
                code: 0,
                message: "success"
            });
        }
        * newPassView() {
            let ctx = this.ctx;
            yield ctx.render('newpass.tpl.html');
        }
    }
    return Auth;
}