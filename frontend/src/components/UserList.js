import React, { useState, useEffect } from 'react';
import axios from '../axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            Name: {user.name}, Email: {user.email}, Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
