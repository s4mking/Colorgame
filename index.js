const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    homeRouter = require('./routes/home'),
    filmsRouter = require('./routes/films'),
    usersRouter = require('./routes/api/users'),
    colorsRouter = require('./routes/api/colorbattle');
          sql = require('./database'),
     { sequelize, User, Colorbattle } = require('./database');

const app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

app.set('view engine', 'ejs');

app.use((request, response, next) => {
   
    request.io = io
    io.on('connection', (socket) => {
        socket.on('color', (color) => {
            console.log(color[2])
            Colorbattle.findByPk(color[2]).then(function(colorbattle) {
                arrayModified = JSON.parse(colorbattle.color)
                arrayModified["id"+color[0]]=color[1]
                 colorbattle.color = JSON.stringify(arrayModified)
                 colorbattle.save()
                 io.emit('changecolor',{colorbattle:color})
              })
             
          });
          
          
      });
      
    request.isFrench = () => {
        return (request.headers['accept-language'] && request.headers['accept-language'].includes('fr'))
    }

    next()

})

app.use(session({
    secret: 'aziheoaiheoanoadoaq azdak',
    cookie: {},
    resave: true,
    saveUninitialized: true
}))

app.use((request, response, next) => {

    if (request.session.user_id) {

        User.findByPk(request.session.user_id).then((user) => {

            if (!user.ban) {
                request.current_user = user
                next()
            } else {
                request.session.user_id = null
                response.render('errors/403')
            }

        })

    } else {
        next()
    }

})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(homeRouter)
app.use(filmsRouter)
app.use(usersRouter)
app.use(colorsRouter)

app.get('/404', (request, response) => {
    response.render('errors/404')
})

server.listen(3000);