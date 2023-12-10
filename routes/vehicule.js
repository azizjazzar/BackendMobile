const express = require('express');
const router = express.Router();

const {
  addVehicule,
  getVehiculeById,
  updateVehicule,
  deleteVehicule,
  getAllVehicules,
} = require('../controllers/vehiculeCrud');

router.post('/addvehicules', addVehicule);
router.get('/vehicules/:id', getVehiculeById);
router.put('/vehicules/:id', updateVehicule);
router.delete('/vehicules/:id', deleteVehicule);
router.get('/vehicules' , getAllVehicules);

module.exports = router;
