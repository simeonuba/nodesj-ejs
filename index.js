const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
// set up port
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());


const handlebars = require('express-handlebars');
app.set('views', path.join(__dirname, 'views/'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("view options", { layout: false } );

app.use('/static', express.static('public'));
// add routes
const router = require('./routes/index.js');
const adminRouter = require('./routes/adminRouter')
app.use('/user', router);
app.use('/admins', adminRouter)
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
