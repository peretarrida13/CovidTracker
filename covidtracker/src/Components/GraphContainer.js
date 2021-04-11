import React, { useEffect, useState } from 'react';
import { useCovidContext } from '../Contexts/contextCovid';

const flagStyle = {
    height:'15px',
    width:'auto',
}

const inputBox = {
    height:'30px',
    fontSize:'15px',
}



function GraphContainer() {
    const { fetchCountries, countries} = useCovidContext();
    const [country, setCountry] = useState('Afghanistan');

    async function getUserLocation(position) {
        const url = 'http://ip-api.com/json';
        
        const response = await fetch(url);
        const data = await response.json();
        
        setCountry(data.country);
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    return(
        <div>
            <select name='option' style={inputBox}>
                {countries.map((country) => {
                    return(
                        <option value={country.country} key={country.country}>{country.country}</option>
                    );
                })}
            </select>
            <h1>Current Graph: {country}</h1>
        </div>
    );
}

export default GraphContainer;
