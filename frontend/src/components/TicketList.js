import React, { useState, useEffect } from 'react';
import axios from '../axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h1>Ticket List</h1>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            Seat: {ticket.seat_number}, Class: {ticket.class}, Fare: {ticket.fare}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
