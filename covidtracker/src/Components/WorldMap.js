import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useCovidContext } from '../Contexts/contextCovid';
import { divIcon } from 'leaflet';
import '../index.css';

const mapStyle = {
    width: '100%',
    height: '500px',
}

const flagStyle = {
    height:'15px',
    width:'auto',
}

const countryName = {
    fontSize:'1.4em',
}

const countryList = {
    listStyle:'none', 
    marginLeft:'-40px',
    fontSize:'15px',
}

function  WorldMap() {
    const { fetchCountries, countries} = useCovidContext();

    useEffect(() => {
        fetchCountries();
    }, [])

    return (
        <MapContainer center={[30, 0]} zoom={2} scrollWheelZoom={true} style={mapStyle}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.mapbox.com/styles/v1/peretarrida/ckn4f6d0a4z7617n5i0rmxa59/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGVyZXRhcnJpZGEiLCJhIjoiY2tuNG52Nmg1MGtvbjJ4bzAzNmJoNmlrZyJ9.vrprOEx9ew4Qb2GPRcgdjQ"
            />
            {
                countries.map((country) => {
                    const date = new Date(country.updated);
                    const cases = Number(country.cases);
                    const aux = cases.toLocaleString();
                    var iconStr = '';

                    if(cases < 1000) iconStr += aux;
                    else if(cases < 10000){
                        iconStr += aux[0] + 'k+';
                    } else{
                        for(let i = 0; i < aux.length; ++i){
                            if(aux[i] === '.' || aux[i] === ',') break;
                            else{
                                iconStr += aux[i];
                            }
                        }
                        if(cases >= 1000000) iconStr += 'm+';
                        else iconStr += 'k+';
                    }

                    const newIcon = divIcon({
                        iconSize:[30, 30],
                        className:'icon-style',
                        html:'<p class=icon-text>'+iconStr+'</p>',
                    })

                    return(
                        <Marker 
                            position={[country.countryInfo.lat, country.countryInfo.long]} 
                            key={country.country}
                            icon={newIcon}
                        >
                            <Popup>
                                <h2 style={countryName}><img src={country.countryInfo.flag} style={flagStyle} alt={country.country}/> {country.country}</h2>
                                <ul style={countryList}>
                                    <li><strong>Confirmed: </strong>{Number(country.cases).toLocaleString()}</li>
                                    <li><strong>Deaths: </strong>{Number(country.deaths).toLocaleString()}</li>
                                    <li><strong>Recovered: </strong>{Number(country.recovered).toLocaleString()}</li>
                                    <li><strong>Last Update: </strong>{date.toUTCString()}</li>
                                </ul>
                            </Popup>
                        </Marker>
                    );
                })
            }
        </MapContainer>
    );
}

export default WorldMap;