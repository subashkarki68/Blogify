1. npm init -y
2. npm i express --save
3. npm i nodemon --save-dev
4. .gitignore
5. node_modules in .gitignore
6. index.js
7. update script in package.json
   a. "dev" : "nodemon index.js"
   b. "start" : "node index.js"
8. npm run dev
9. In index.js, require express
10. create app using express()
11. app.get() // Hello world
12. app.listen()

// Blog Mgmt System

1. Users
2. blogs
3. Categories

// Environment Variables
package: dotenv

// Logging Mechanism
package: morgan

// User login (Authentication)

return token (Authorization)

// User Register

1. name, email, password => route => controller
2. bcrypt js encrypt the password
3. store the user info in database
4. send email notification
