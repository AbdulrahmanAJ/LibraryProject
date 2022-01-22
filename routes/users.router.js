var router = require('express').Router()
var controller = require('../controllers/users.controller')



// create the routing
router.get('/login', controller.getForLogin)
router.post('/login', controller.postLogin)

router.get('/register', controller.getForRegister)
router.post('/register', controller.postRegister)

router.get('/logout', controller.getLogout)



module.exports = router