const express = require('express'),
      router = express.Router(),
      sql = require('../database');

// router.all('api/films/:id(\\d+)', (request, response, next) => {
    
//     sql.query(`SELECT * FROM films WHERE id_film = ${request.params.id}`, (err, result) => {

//         if (result[0]) {
//             request.film = result[0]
//             next()
//         } else {
//             response.redirect('/404')
//         }

//     })

// })

router.get('api/films/:id(\\d+)', (request, response) => {
    
    sql.query(`SELECT * FROM films WHERE id_film = ${request.params.id}`, (err, result) => {

        if (result[0]) {
            request.film = result[0]
            next()
        } else {
            response.redirect('/404')
        }

    })

})

router.put('/films/:id(\\d+)', (request, response) => {

    sql.query(`UPDATE titre = ${request.body.title} FROM films WHERE id_film = ${request.film.id_film} `, (err, result) => {
        response.render('film', {
            film: result[0],
        });
    })

})

router.delete('api/films/:id(\\d+)', (request, response) => {

    sql.query(`DELETE FROM films WHERE id_film = ${request.film.id_film}`, (err, result) => {

        response.json({status: 200})

        request.io.sockets.emit('films', {
            type: "DELETE",
            id_film: request.film.id_film
        })

    })

})

module.exports = router
