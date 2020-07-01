const express = require('express'),
      router = express.Router(),
      { sequelize, Colorbattle } = require('../../database'),
      bodyParser = require('body-parser'),
      sha1 = require('sha1')

router.post('/api/colorbattle/', (request, response) =>{
    arrayDefault = {}
        for(i=0;i<257;i++){
            arrayDefault[i] = null
        }
    return Colorbattle.create({
        color:JSON.stringify(arrayDefault)
    }).then(function (Colorbattle) {
        if (Colorbattle) {
            response.send(Colorbattle);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});

router.put('/api/colorbattle/', (request, response) =>{
    arrayDefault = {}
        for(i=0;i<257;i++){
            arrayDefault[i] = null
        }
    return Colorbattle.create({
        color:JSON.stringify(arrayDefault)
    }).then(function (Colorbattle) {
        if (Colorbattle) {
            response.send(Colorbattle);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});
router.put('/api/colorbattle/:id(\\d+)', (request, response) => {

    request.user.update({
        color: request.body.color
    }).then((colorbattle) => {
        response.json(colorbattle)
    })

})

router.get('/api/colorbattle/:id(\\d+)', (request, response) => {
    response.json(request.user)
    findOrCreate({where: {id: request.params.id}}).then((colorbattle) => {

})
})

router.all('/api/colorbattle/:id(\\d+)', (request, response, next) => {

    Colorbattle.findByPk(request.params.id).then((colorbattle) => {

        if (colorbattle) {
            request.colorbattle = colorbattle
            next()
        } else {
            response.status(404).json({message: "user not found"})
        }

    })

})



module.exports = router