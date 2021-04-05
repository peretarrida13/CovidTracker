import React, { useEffect } from 'react';
import WorldMap from './Components/WorldMap'; 
import BigStats from './Components/BigStats';
import SmallStats from './Components/SmallStats';
import { useCovidContext } from './Contexts/contextCovid';

const dataStyle =  {
  display:'grid',
  gridTemplateColumns: 'auto auto auto',
  backgroundColor:'	#2d2d2d',

  color:'#ababab',
}

function App() {
  const { fetchData, data} = useCovidContext();

  useEffect(() => {
    fetchData();
  }, []);

  const date = new Date(data.updated);

  return (
    <>
      <WorldMap/> 
      <div style={dataStyle}>
        <BigStats statsName='Total Tests' data={data.tests} dataMilion={data.testsPerOneMillion}/>
        <BigStats statsName='Total Cases' data={data.cases} dataMilion={data.casesPerOneMillion}/>
        <BigStats statsName='Total Deaths' data={data.deaths} dataMilion={data.deathsPerOneMillion}/>
        <SmallStats statsName='Active' data={data.active}/>
        <SmallStats statsName='Critical' data={data.critical}/>
        <SmallStats statsName='Recovered' data={data.recovered}/> 
      </div>
      <p>Last Updated: {date.toUTCString()} </p>
    </>
  );
}

export default App;
