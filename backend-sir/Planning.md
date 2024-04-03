login and register

1. model (name, email and password)
2. controller register function
3. utils/bcrypt.js file => hashPassword, comparePassword
4. register => payload.password => hashPassword => model.create(payload)
5. nodemailer => service/mailer.js => mail transporter
6. email notification

7. .env Update

## Authentication

1. login = send email and password
2. middleware in route to check if the email is email and password is valid password
3. user login method in controller
   a. email exist ? userModel.findOne({email})
   b. if no user => throw new Error('User doesn't exist')
   c. password , db store password compare garnu paryo using utils / compare password function

   d. Cookie, Session, JWT (JSON WEB TOKEN)

Functions in User mgmt

1. register
2. login
3. post new user by admin
4. get by id (admin)
5. update by id (admin)
6. disabled user by admin
7. forget password
   a. generate fp token
   b. verify fp token
8. change password
9. reset password by admin
10. get my profile
11. update my profile
12. get all users (admin)
