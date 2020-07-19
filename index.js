require('dotenv').config()

const express = require('express'),
    bodyParser = require('body-parser'),

    authorizationMiddleware = require('./middlewares/authorization'),

    homeRouter = require('./routes/home'),
    filmsRouter = require('./routes/films'),
    usersRouter = require('./routes/api/users');
    cors = require('cors');
const { sequelize, Colorbattle, Films , Genres, Distributeurs,Board } = require('./database');



const app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);
    app.use(cors());
app.set('view engine', 'ejs');

app.use(authorizationMiddleware)

app.use((request, response, next) => {

    request.io = io
    // io.on('connect', (socket) => {
    //     console.log(socket.id, "you're connected despite conn event name")
    //     socket.on('pingServer', (msg) => {
    //         console.log("logging message");
    //       console.log(msg);
    //     });
    //   });
    io.on('connection', function(socket) {
        console.log(socket.id)
        socket.on('removeDistrib', function(data) {
            io.emit('deleteDistrib',data)
            });
        socket.on('modifyDistrib', function(data) {
            Distributeurs.findByPk(data.id_distributeur).then((distrib) => {
                if (distrib) {
                    io.emit('modifDistrib', distrib)
                }
            })
            
        });
        socket.on('removeFilm', function(data) {
            io.emit('deleteFilm',data)
            });
        socket.on('modifyFilm', function(data) {
            Films.findByPk(data.id_film).then((distrib) => {
                if (distrib) {
                    io.emit('modifFilm', distrib)
                }
            })
            
        });
    
    });
    request.isFrench = () => {
        return (request.headers['accept-language'] && request.headers['accept-language'].includes('fr'))
    }

    next()

})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(homeRouter)
app.use(filmsRouter)
app.use(usersRouter)

app.get('/board/:id(\\d+)', (req, res) => {

    // ?id=1 <- QUERY

    Board.findByPk(req.params.id).then((board) => {
        if (board) {


            res.render('board', {board: board})
        } else {

            let boardWidth = 10
            let board = []

            for (let index = 0; index < boardWidth; index++) {
                board.push(new Array(boardWidth))
            }

            Board.create({
                data: JSON.stringify(board)
            }).then((board) => {
                res.render('board', {board: board})
            })
            
        }
    })

})


app.get('/board/:id(\\d+)/colors', (request, response)  => {

    response.json({status: 200})

    Board.findByPk(request.params.id).then((board) => {

        let data = JSON.parse(board.data)

        if (!data[request.query.x][request.query.y]) {

            data[request.query.x][request.query.y] = request.query.color
        
            board.update({
                data: JSON.stringify(data)
            }).then(() => {

                request.io.sockets.emit('color', {
                    id: request.query.id,
                    color: request.query.color,
                })

            })

        }

    })

})

app.get('/404', (request, response) => {
    response.render('errors/404')
})

server.listen(3000);