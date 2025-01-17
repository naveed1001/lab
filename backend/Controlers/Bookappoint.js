const Bookappoint = require('../Models/BookAppoint');

const Createappoint =  async (req, res) => {
    try {
      const { name, email, date, time, message } = req.body;
  
      if (!name || !email || !date || !time) {
        return res.status(400).json({ error: 'Name, email, date, and time are required.' });
      }
  
      const appointment = new Bookappoint({
        name,
        email,
        date,
        time,
        message,
      });
  
      const savedAppointment = await appointment.save();
  
      res.status(201).json({
        message: 'Appointment created successfully',
        appointment: savedAppointment,
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    Createappoint
  }