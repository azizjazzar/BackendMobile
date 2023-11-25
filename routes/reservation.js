const express = require('express');
const router = express.Router();
const {
  addReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getAllReservations,
  createPaymentIntent,
  confirmpayment
} = require('../controllers/reservationCrud');

router.post('/addreservations', addReservation);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);
// Correct: Ensure that getAllReservations is defined and exported
router.get('/reservations', getAllReservations);
router.post('/create-payment-intent', createPaymentIntent);
router.post('/confirmpayment', confirmpayment);
module.exports = router;
