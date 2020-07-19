const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      sha1 = require('sha1'),
      fs = require('fs').promises,
      validatorUserCreate = require('./../../validators/users_create'),
      { Op } = require('sequelize'),
      moment = require('moment'),
      jwt = require('jsonwebtoken')

let { 
    User,
    Post,
    PostCategory
} = require('../../database')

router.post('/api/users/login', async (request, response) => {
    // console.log(request)
    let user = await User.findOne({where: {
        email: request.body.username,
        password: sha1(request.body.password)
    }})

    if (user) {
        response.json({status: 200, token: jwt.sign({ id: user.id }, 'testsamuel') })
    } else {
        response.json({status: 400})
    }

})

router.get('/api/users', async (request, response) => {

    if (request.user.isSupport()) {

        let date = moment()
        date.subtract(1, 'week')

        console.log('HELLO')

        let users = await User.findAll({
            where: {
                createdAt: {
                    [Op.between]: [date.toDate(), new Date()]
                }
            },
            include: [
                { 
                    model: Post,
                    include: [
                        { model: PostCategory }
                    ]
                }
            ]
        })

        response.json(users)

    } else {
        response.status(401).json({status: 401, msg: "Non pas admin"})
    }

    

})

router.post('/api/users', validatorUserCreate , (request, response) => {

    User.create({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        birth_date: new Date(),
        password: sha1(request.body.password)
    }).then((user) => {
        response.json({status: 201, data: user})
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