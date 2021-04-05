import React, { useContext, useState } from "react";


const AppContext = React.createContext();


export const AppProvider = ({children}) => {
    const [data, setData] = useState({});
    const [countries, setCountries]= useState([]);

    async function fetchData(){
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        const newData = await response.json();

        setData(newData);
    }

    async function fetchCountries() {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const newCountries = await response.json();

        setCountries(newCountries);
    }
    
    return(
        <AppContext.Provider
            value={{
                data,
                fetchData,
                fetchCountries,
                countries,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useCovidContext = () => {
    return useContext(AppContext);
}

