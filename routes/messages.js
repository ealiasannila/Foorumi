var express = require('express');
var router = express.Router();
var authentication = require('../utils/authentication');
var Models = require('../models');
// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function (req, res, next) {
    var messageId = req.params.id;
    Models.Message.findOne({
        where: {id: messageId},
        include: {model: Models.Reply,
            include: {model: Models.User}}
    }).then(function (messages) {
        res.json(messages);
        res.send(200);
    });
    // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)


});
// POST /messages/:id/reply
router.post('/:id/reply', authentication, function (req, res, next) {
    
    var replyToAdd = req.body;
    replyToAdd.MessageId = req.params.id;
    replyToAdd.UserId = req.session.userId;
    
    Models.Reply.create(replyToAdd).then(function (reply) {

        res.json(reply);
        res.send(200);
    });
    // Palauta vastauksena lisätty vastaus
});
module.exports = router;
