import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchTrainsPage = () => {
  const [trains, setTrains] = useState([]);
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [shouldSearch, setShouldSearch] = useState(false);

  const handleSearch = async () => {
    setShouldSearch(true); 
  };

  useEffect(() => {
    if (shouldSearch && sourceStation && destinationStation) {
      const fetchTrains = async () => {
        try {
          const token = localStorage.getItem('x-auth-token');
          if (!token) {
            console.error('No token found. Please log in.');
            return;
          }

          const encodedSourceStation = encodeURIComponent(sourceStation.trim());
          const encodedDestinationStation = encodeURIComponent(destinationStation.trim());

          const response = await axios.get(
            `http://localhost:5000/api/trains?sourceStation=${encodedSourceStation}&destinationStation=${encodedDestinationStation}`,
            {
              headers: {
                'x-auth-token': token
              }
            }
          );
          setTrains(response.data);
          console.log('Search Results:', response.data);
        } catch (error) {
          if (error.response) {
            console.error('Error searching trains:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('Error searching trains: No response from server');
          } else {
            console.error('Error searching trains:', error.message);
          }
        }
      };

      fetchTrains();
      setShouldSearch(false); // Reset the state to avoid continuous searches
    }
  }, [shouldSearch, sourceStation, destinationStation]);

  return (
    <div>
      <h1>Search Trains</h1>
      <input
        type="text"
        value={sourceStation}
        onChange={(e) => setSourceStation(e.target.value)}
        placeholder="Source Station"
      />
      <input
        type="text"
        value={destinationStation}
        onChange={(e) => setDestinationStation(e.target.value)}
        placeholder="Destination Station"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {trains.map((train) => (
          <li key={train._id}>{train.name} - {train.train_number}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTrainsPage;
