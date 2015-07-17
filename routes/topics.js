var express = require('express');
var router = express.Router();
var authentication = require('../utils/authentication');
var Models = require('../models');
// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    Models.Topic.findAll().then(function (topics) {
        res.json(topics);
        res.send(200);
    });
});
// GET /topics/:id
router.get('/:id', function (req, res, next) {
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    var topicId = req.params.id;
    Models.Topic.findOne({
        where: {id: topicId},
        include: {
            model: Models.Message,
            include: {
                model: Models.User,
            }
        }
    }).then(function (topic) {
        res.json(topic);
        res.send(200);
    });
});
// POST /topics
router.post('/', authentication, function (req, res, next) {
    // Lisää tämä aihealue

    var topicToAdd = req.body;
    console.log(topicToAdd);
    Models.Topic.create(topicToAdd).then(function (topic) {
        res.json(topic);
        res.send(200);
    });
    // Palauta vastauksena lisätty aihealue
});
// POST /topics/:id/message
router.post('/:id/message', authentication, function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    messageToAdd.TopicId = req.params.id;
    messageToAdd.UserId = req.session.userId;
    Models.Message.create(messageToAdd).then(function (message) {

        res.json(message);
        res.send(200);
    });
});
module.exports = router;
