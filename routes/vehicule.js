const express = require('express');
const router = express.Router();
const { verifyTokenMiddleware } = require("../middleware/auth");

const {
  addVehicule,
  getVehiculeById,
  updateVehicule,
  deleteVehicule,
  getAllVehicules,
} = require('../controllers/vehiculeCrud');

router.post('/addvehicules',verifyTokenMiddleware, addVehicule);
router.get('/vehicules/:id', getVehiculeById);
router.put('/vehicules/:id', updateVehicule);
router.delete('/vehicules/:id', deleteVehicule);
router.get('/vehicules',verifyTokenMiddleware, getAllVehicules);

module.exports = router;
