import React from 'react';
import TicketList from '../components/TicketList';
import CreateTicketForm from '../components/CreateTicketForm';

const TicketPage = () => {
  return (
    <div>
      <h1>Tickets</h1>
      <TicketList />
      <CreateTicketForm />
    </div>
  );
};

export default TicketPage;
