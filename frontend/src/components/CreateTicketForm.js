import React, { useState } from 'react';
import axios from '../axios';

const CreateTicketForm = () => {
  const [reservation_id, setReservationId] = useState('');
  const [train_id, setTrainId] = useState('');
  const [seat_number, setSeatNumber] = useState('');
  const [classType, setClassType] = useState('');
  const [fare, setFare] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/tickets', {
        reservation_id,
        train_id,
        seat_number,
        class: classType,
        fare,
      });
      alert('Ticket created successfully!');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Ticket</h1>
      <input
        type="text"
        placeholder="Reservation ID"
        value={reservation_id}
        onChange={(e) => setReservationId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Train ID"
        value={train_id}
        onChange={(e) => setTrainId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Seat Number"
        value={seat_number}
        onChange={(e) => setSeatNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Class"
        value={classType}
        onChange={(e) => setClassType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Fare"
        value={fare}
        onChange={(e) => setFare(e.target.value)}
        required
      />
      <button type="submit">Create Ticket</button>
    </form>
  );
};

export default CreateTicketForm;
