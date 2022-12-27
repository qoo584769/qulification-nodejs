const express = require('express')
const router = express.Router()

const viewController = require('../controllers/view')
const { isAuth } = require('../middlewares/tokenCheck')

router.get('/getView', viewController.getView)
router.post('/createView', isAuth, viewController.createView)
router.patch('/updateView/:viewId', isAuth, viewController.updateView)
router.delete('/deleteView/:viewId', isAuth, viewController.deleteView)

router.patch('/updateLike/:viewId', isAuth, viewController.updateLike)

module.exports = router
