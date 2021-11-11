const express = require('express')
const fs = require('fs')
const path = require('path')
//const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const db = require('../database/config/db.config')
const users = require('../controller/user_controller')

const app = express();

const publicStaticDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views')
//const partialsPath = path.join(__dirname,'../views/partials')

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.engine('hbs', exphbs( {extname: '.hbs' }));

app.set('view engine','hbs')

//app.set('views', viewsPath)

//app.set('view options', { layout: 'main' });

app.use(express.static(publicStaticDirPath))

var port = process.env.PORT || 3000 

app.get('/' ,(req,res) => res.render('home',{name: 'Upamanyu'}))

app.post('/', async (req,res) => {

    const User = db["User"];
    //console.log(User)
    const login = await User.findOne({ where: { username: req.body.username, password: req.body.password }});

    if(login === null)
        res.redirect('/')
    
    else
    {
        role = login.role_name ;
        
        switch(role)
        {
            case 'admin':
               res.redirect('admin-landing')
               break;
            case 'student':
               res.redirect('student-landing')
                break;
               case 'instructor':
               res.redirect('teacher-landing')
              
        }
    }

   
})


app.get('/admin-landing',  (req,res) => {
    
    res.render('admin-landing',{name: "admin"})
})



app.get('/signup',(req,res) => res.render('signup'))

app.post('/signup', async (req,res) => {

    console.log(req.body)

   const User = db["User"];
   let user = {
    username: req.body.username,
    password: req.body.password,
    role_name: req.body.role,
} 

const newUser = await User.findOrCreate({ where: { username: "req.body.username"}, defaults: user});


})

app.get('/admin-user', (req,res) => res.render(admin-user))

app.get('/admin-user', (req,res) => res.render(admin-user))




// Mysql Database conection
db.sequelize.sync().then( async() => {
    console.log("DB Connected")
    // console.log(db)

    const Role = db["Role"]
    const User = db["User"] 


    // insert Role
    const [admin_role , college_super_admin_created] = await Role.findOrCreate({ where: { role_name: "admin"}, defaults: { role_name: "admin"}});
    const student_role = await Role.findOrCreate({ where: { role_name: "student"}, defaults: { role_name: "student"}});
    const instructor_role = await Role.findOrCreate({ where: { role_name: "instructor"}, defaults: { role_name: "instructor"}});

    //  admin object
    let admin = {
        username: "admin",
        password: 'password',
        role_name: "admin",
    }
    // insert super_admin user details in User table
    const admin_save = await User.findOrCreate({ where: { username: "admin"}, defaults: admin});

}).catch(err => console.log(err));    



app.listen(port, () => {
    console.log('Server listening from port', port)
    console.log(publicStaticDirPath)

    
})