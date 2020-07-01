
const express = require('express'),
      router = express.Router(),
      sql = require('../database'),
      { sequelize, Colorbattle } = require('../database');

router.get('/', (request, response) => {

    response.render('index', {
        name: 'Juan',
        data: [],
        films: []
    });

})


router.get('/login', (request, response) => {

    response.render('login', {
        user: request.current_user
    });

})

router.get('/register', (request, response) => {

    response.render('register', {
    });

})
router.get('/colorBattlenew/', (request, response) => {
    arrayDefault = {}
    for(i=0;i<625;i++){
        arrayDefault["id"+i] = "none"
    }
    Colorbattle.create({
        color:JSON.stringify(arrayDefault)
    }).then((colorbattle) => {
        response.render('colorBattle', {
            arraydata : arrayDefault
            });
    })
    
    
})

router.get('/colorBattle/', (request, response) => {
    Colorbattle.findAll().then(function(colorbattles) {   
        response.render('colorBattleAll', {
            colorBattleAll : colorbattles
         })
    })
})
router.get('/colorbattle/:id(\\d+)', (request, response) => {
    Colorbattle.findByPk(request.params.id).then((colorbattle) => {
        response.render('colorBattle', {
            arraydata : JSON.parse(colorbattle.color),
            id: request.params.id
            });
})
})



module.exports = router