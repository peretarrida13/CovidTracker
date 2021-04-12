import React, { useEffect, useState, useRef } from 'react';
import { useCovidContext } from '../Contexts/contextCovid';
import LineChart from 'react-linechart';

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
    const [countryData, setCountryData] = useState([]);
    const selected = useRef(null);

    async function getUserLocation(position) {
        const url = 'http://ip-api.com/json';
        
        const response = await fetch(url);
        const data = await response.json();
        
        setCountry(data.country);
    }

    async function getCountryData(){
        const url = 'https://api.covid19api.com/dayone/country/' + country + '/status/confirmed';
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        var newData = [];
        data.map((day, index) => {
            const newDay =  {
                x: index,
                y: day.Cases,
            }
            newData.push(newDay);
        })
        setCountryData(newData);
    }
    
    const changeCountry = () => {
        setCountry(selected.current.value);
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        getCountryData();
    }, [country]);

    const config = [
        {									
            color: "steelblue", 
            points: countryData,
        }
    ];


    return(
        <div>
            <select name='option' style={inputBox} ref={selected} onChange={changeCountry}>
                {countries.map((country) => {
                    return(
                        <option value={country.country} key={country.country}>{country.country}</option>
                    );
                })}
            </select>
            <h1>Current Graph: {country}</h1>
            <LineChart 
                width={600}
                height={400}
                data={config}
            />
        </div>
    );
}

export default GraphContainer;
