
const express = require('express'),
      router = express.Router(),
      sql = require('../database'),
      sqs = require('sequelize-querystring'),
      { sequelize, Colorbattle, Films } = require('../database');

router.get('/', (request, response) => {
    response.render('index', {
        name: 'Juan',
        data: [],
        films: []
    });
})
router.get('/films', (req, response) => {

    let offset = parseInt(req.query.offset);
    let sort = req.query.sort || "id";
    let limit = parseInt(req.query.limit) || 10;
   // console.log(req.query.limit)
    return Films.findAndCountAll({
        offset: parseInt(req.query.offset) || 0,
        limit: parseInt(req.query.limit) || 10,
        where: req.query.filter ? sqs.find(req.query.filter) : {},
        order: req.query.sort ? sqs.sort(req.query.sort) : []
      })
      .then((results) => {
          console.log(limit)
        results.rows = results.rows.map((o) => { return o.get() })
        response.render('films', {
            results : results.rows,
            count: results.count,
            limit: limit,
            prec: offset-1,
            next:offset+1,
            sort:sort
        })
       
      })
    //   .catch((err) => {
    //    // log.error(err)
    //     res(err).code(500)
    //   })        
    });

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