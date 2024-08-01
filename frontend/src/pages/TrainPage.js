import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainPage = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
  
        console.log('User role:', response.data.role);
  
        setRole(response.data.role);
  
        if (response.data.role === 'operator') {
          navigate('/add-train');
        } else {
          navigate('/search-trains');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
    
        navigate('/login');
      }
    };
  
    fetchUserRole();
  }, [navigate]);
  

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default TrainPage;
