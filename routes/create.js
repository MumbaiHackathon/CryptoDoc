var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.send('Add buttons to choose which document to create here');
});

router.get('/aadhar', (req, res) => {
    res.send('Form to create new aadhar');
});

router.get('/mobile', (req, res) => {
    res.send('Add form to add mobile number here');
});

router.get('/address', (req, res) => {
    res.send('Add form to add residential address here');
});

router.get('/certificate', (req, res) => {
    res.send('Add form to add certificates here');
});

module.exports = router;