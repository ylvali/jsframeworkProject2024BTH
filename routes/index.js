
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var dataContent;

    dataContent = "BTH jsramverk sample production";

    const data = {
        data: {
            msg: "JsRamverk2024",
            pres2: dataContent
        }
    };

    res.json(data);
});

module.exports = router;
