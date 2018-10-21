const express = require('express');
const router = express.Router();
const carHandler = require('./handlers/car');

router.post('/car', carHandler.create);
router.get('/car', carHandler.getAll);
router.get('/car/:id', carHandler.getById);
router.put('/car/:id', carHandler.updateById);
router.delete('/car/:id', carHandler.deleteById);

module.exports = router;