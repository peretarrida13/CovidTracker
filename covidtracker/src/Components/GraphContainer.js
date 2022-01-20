import React, { useEffect, useState, useRef } from 'react';
import { useCovidContext } from '../Contexts/contextCovid';
import LineChart from 'react-linechart';

const inputBox = {
    height:'30px',
    fontSize:'15px',
}

const casesStyle = {
    backgroundColor:'#ababab', 
    height:'250px', 
    width:'300px', 
    color:'black',

    position:'absolute',
    top:'1175px',
    left:'50px',
    borderRadius:'5px'
}

function GraphContainer() {
    const { countries } = useCovidContext();
    const [country, setCountry] = useState('Afghanistan');
    const [countryData, setCountryData] = useState([]);
    const [error, setError] = useState(false);
    const [dayStats, setDayStats] = useState({});
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
            const date = day.Date;
            const newDay =  {
                x: date.substr(0,10),
                y: day.Cases,
            }
            newData.push(newDay);
            return newData;
        })
        setCountryData(newData);
    }
    
    const changeCountry = () => {
        setCountry(selected.current.value);
    }

    useEffect(() => {
        try{
            getUserLocation();
        } catch{
            setError(true);
        }
        
    }, []);

    useEffect(() => {
        try{
            getCountryData();
        } catch {
            setError(true);
        }
    }, [country]);

    const config = [
        {									
            color: "#8d2663", 
            points: countryData,
        }
    ];

    const todayCases = countryData[countryData.length -1];
    var stringCases;
    if(todayCases) stringCases = Number(todayCases.y).toLocaleString();

    if(error){
        return(
            <div>
                <select name='option' style={inputBox} ref={selected} onChange={changeCountry}>
                    {countries.map((country) => {
                        return(
                            <option value={country.country} key={country.country}>{country.country}</option>
                        );
                    })}
                </select>
                <h1>Graph Not Available</h1>
            </div>
        )
    }

    const setPoint = (point) => {
        const stats = countryData.filter((data) => data.x === point.x);
        const newDayStats = stats[0];
        const aux = {
            x: newDayStats.x,
            y: Number(newDayStats.y).toLocaleString(),
        }
        setDayStats(aux);
    }

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
            <div style={{backgroundColor:'#ababab',marginBottom:'50px', marginLeft:'400px', marginRight:'400px',borderRadius:'5px'}}>
                <h1 style={{color:'black'}}>Actual cases: {stringCases}</h1>
                <LineChart 
                    width={1000}
                    height={400}
                    data={config}
                    hideYAxis={true}
                    hidePoints={false}
                    isDate={true}
                    onPointHover={setPoint}
                />
            </div>
            <div style={casesStyle}>
                <h1>Date: </h1>
                {dayStats ? <h1>{dayStats.x}</h1> : <p>NO DATA</p>}
                <h2>Cases: </h2>
                {dayStats ? <h2>{dayStats.y}</h2> : <p>NO DATA</p>}
            </div>
        </div>
    );
}

export default GraphContainer;
