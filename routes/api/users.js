const express = require('express'),
      router = express.Router(),
      { sequelize, User } = require('../../database'),
      bodyParser = require('body-parser'),
      sha1 = require('sha1')
    
 
router.post('/api/users/login', (request, response) => {

    User.findOne({where: {
        email: request.body.email,
        password: sha1(request.body.password)
    }}).then((user) => {

        if (user) {

            // request.session.user = user

            request.session.user_id = user.id
            response.json({status: 200})
        } else {
            response.json({status: 400})
        }

    })

})

router.post('/api/users/register', (request, response) => {

    User.findOne({where: {
        email: request.body.email,
        password: sha1(request.body.password)
    }}).then((user) => {

        if (user) {

            // request.session.user = user
            request.session.user_id = user.id
            response.json({status: 200})
        } else {
            response.json({status: 400})
        }

    })

})

router.get('/api/users', (request, response) => {

    User.findAll().then((users) => {
        response.json(users)
    })

})

router.post('/api/users', (request, response) => {

    User.create({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        birth_date: new Date()
    }).then((user) => {
        response.json(user)
    })

})

router.all('/api/users/:id(\\d+)', (request, response, next) => {

    User.findByPk(request.params.id).then((user) => {

        if (user) {
            request.user = user
            next()
        } else {
            response.status(404).json({message: "user not found"})
        }

    })

})

router.get('/api/users/:id(\\d+)', (request, response) => {
    response.json(request.user)
})

router.put('/api/users/:id(\\d+)', (request, response) => {

    request.user.update({
        firstname: request.body.firstname,
        lastname:  request.body.lastname
    }).then((user) => {
        response.json(user)
    })

})

router.delete('/api/users/:id(\\d+)', (request, response) => {

    request.user.destroy().then((user) => {
        response.json(user)
    })

})

module.exports = router