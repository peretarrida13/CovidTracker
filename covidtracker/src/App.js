import React, { useEffect, useState } from 'react';
import WorldMap from './Components/WorldMap'; 
import BigStats from './Components/BigStats';
import SmallStats from './Components/SmallStats';
import GraphContainer from './Components/GraphContainer';
import { useCovidContext } from './Contexts/contextCovid';

const dataStyle =  {
  display:'grid',
  gridTemplateColumns: 'auto auto auto',
  backgroundColor:'#2d2d2d',

  color:'#ababab',
}

const dataStyleMobile = {
  display:'grid',
  gridTemplateColumns: 'auto auto',
  backgroundColor:'#2d2d2d',

  color:'#ababab',
}

const buttonStyle = {
  padding:'5px',
  marginTop:'10px',
  marginBottom:'10px',
  backgroundColor:'transparent',
  color:'white',

  borderRadius:'5px',
  borderStyle:'solid',

}

function App() {
  const { fetchData, data} = useCovidContext();
  const [today, setToday] = useState(false);
  const [buttonTxt, setButtonTxt] = useState('Change to todays data');

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if(today) setButtonTxt('Change to todays data');
    else setButtonTxt('Change to overall data');

    setToday(!today);
  }

  const date = new Date(data.updated);

  if(today){
    return (
      <>
        <WorldMap/> 
        <button style={buttonStyle} onClick={handleClick}>{buttonTxt}</button>
        <div style={dataStyle}>
          <SmallStats statsName='Today Cases' data={data.todayCases}/>
          <SmallStats statsName='Today Deaths' data={data.todayDeaths}/>
          <SmallStats statsName='Today Recovered' data={data.todayRecovered}/> 
        </div>
        <p>Last Updated: {date.toUTCString()} </p>
      </>
    );
  }

  return (
    <>
      <WorldMap/> 
      <button style={buttonStyle} onClick={handleClick}>{buttonTxt}</button>
      <div style={dataStyle}>
        <BigStats statsName='Total Tests' data={data.tests} dataMilion={data.testsPerOneMillion}/>
        <BigStats statsName='Total Cases' data={data.cases} dataMilion={data.casesPerOneMillion}/>
        <BigStats statsName='Total Deaths' data={data.deaths} dataMilion={data.deathsPerOneMillion}/>
        <SmallStats statsName='Active' data={data.active}/>
        <SmallStats statsName='Critical' data={data.critical}/>
        <SmallStats statsName='Recovered' data={data.recovered}/>
      </div>
      <p>Last Updated: {date.toUTCString()} </p>
      <GraphContainer/> 
    </>
  );
}

export default App;
