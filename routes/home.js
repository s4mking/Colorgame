
const express = require('express'),
      router = express.Router(),
      sql = require('../database'),
      sqs = require('sequelize-querystring'),
      { sequelize, Colorbattle, Films , Genres, Distributeurs} = require('../database');

router.get('/', (request, response) => {
    response.render('index', {
        name: 'Juan',
        data: [],
        films: []
    });
})
router.get('/api/films', (req, response) => {
    console.log(parseInt(req.query.offset))
    let offset = 20 * parseInt(req.query.offset) -20;
    console.log(offset)
    let sort = req.query.sort || "id";
    let limit = parseInt(req.query.limit) || 20;
    return Films.findAndCountAll({
        include: [{// Notice `include` takes an ARRAY
        model: Genres,Distributeurs
      }],
        offset: offset || 0,
        limit: parseInt(req.query.limit) || 20,
        where: req.query.filter ? sqs.find(req.query.filter) : {},
        order: req.query.sort ? sqs.sort(req.query.sort) : []
      })
      .then((results) => {
          console.log(limit)
        results.rows = results.rows.map((o) => { return o.get() })
        response.json({
                films : results.rows,
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
    router.get('/api/films/:id(\\d+)', (request, response) => {
    

        Films.findByPk(request.params.id).then((film) => {
            if (film) {
                response.json({
                    film : film,
                })
    
            } else {

            }    
        })
    
    })
    router.delete('/api/films/:id(\\d+)', (request, response) => {
        sequelize.query(`DELETE FROM films WHERE id_film = ${request.params.id}`, (err, result) => {
    
            response.json({status: 200})
    
            request.io.sockets.emit('films', {
                type: "DELETE",
                id_film: request.film.id_film
            })
    
        })
    
    });

    router.put('/api/films/:id(\\d+)', (req, res, next) => {
        sequelize.query(`UPDATE films SET titre = ?, resum = ? WHERE id_film = ? `,
        {replacements: [req.body.titre,req.body.resum,req.params.id], type:sequelize.QueryTypes.UPDATE}
         ).then(function(film){
            res.json({
                filmid : req.params.id,
            })
         })        
           })

           router.get('/api/distributeurs', (req, response) => {
            console.log(parseInt(req.query.offset))
            let offset = 20 * parseInt(req.query.offset) -20;
            console.log(offset)
            let sort = req.query.sort || "id";
            let limit = parseInt(req.query.limit) || 20;
            return Distributeurs.findAndCountAll({
                offset: offset || 0,
                limit: parseInt(req.query.limit) || 20,
                where: req.query.filter ? sqs.find(req.query.filter) : {},
                order: req.query.sort ? sqs.sort(req.query.sort) : []
              })
              .then((results) => {
                  console.log(limit)
                results.rows = results.rows.map((o) => { return o.get() })
                response.json({
                        distributeurs : results.rows,
                        count: results.count,
                        limit: limit,
                        prec: offset-1,
                        next:offset+1,
                        sort:sort
                    })
              })     
            });
            router.get('/api/distributeurs/:id(\\d+)', (request, response) => {
            
        
                Distributeurs.findByPk(request.params.id).then((distributeur) => {
                    if (distributeur) {
                        response.json({
                            distributeur : distributeur,
                        })
            
                    } else {
        
                    }    
                })
            
            })
            router.delete('/api/distributeurs/:id(\\d+)', (request, response) => {
                sequelize.query(`DELETE FROM distributeurs WHERE id_distributeur = ${request.params.id}`, (err, result) => {
            
                    response.json({status: 200})
            
                    request.io.sockets.emit('distributeurs', {
                        type: "DELETE",
                        id_distributeur: request.distributeur.id_distributeur
                    })
            
                })
            
            });
        
            router.put('/api/distributeurs/:id(\\d+)', (req, res, next) => {
                sequelize.query(`UPDATE distributeurs SET nom = ?, telephone = ? WHERE id_distributeur = ? `,
                {replacements: [req.body.nom,req.body.telephone,req.params.id], type:sequelize.QueryTypes.UPDATE}
                 ).then(function(distributeur){
                     console.log("zajehvazjevazjevkajzhvekjazhvekjazhve")
                    req.io.sockets.emit("customEmit", 1)
                    res.json({
                        distributeurid : req.params.id,
                    })
                 })        
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