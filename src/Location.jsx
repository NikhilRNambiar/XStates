import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Location() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

   
    useEffect(() => {
        axios.get('https://crio-location-selector.onrender.com/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    
    useEffect(() => {
        if (selectedCountry) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => {
                    setStates(response.data);
                    setCities([]); 
                    setSelectedState(""); 
                    setSelectedCity(""); 
                })
                .catch(error => console.error('Error fetching states:', error));
        }
    }, [selectedCountry]);

    // Fetch cities when a state is selected
    useEffect(() => {
        if (selectedState) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => {
                    setCities(response.data);
                    setSelectedCity(""); // Reset selected city
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedState, selectedCountry]);

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h1>Select Location</h1>
            <div style={{display:'flex',justifyContent:'space-around'}}>
            <div>
                
                <select 
                    value={selectedCountry} 
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="" disabled>Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <div>
                
                <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                >
                    <option value="" disabled>Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            <div>
               
                <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            </div>

            {selectedCountry && selectedState && selectedCity && (
                <div style={{ marginTop: '20px' }}>
                    <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
                </div>
            )}
        </div>
    );
}

export default Location;
