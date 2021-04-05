import React from 'react';

const cellStyle = {
    backgroundColor:'#2D2D2D',

    borderColor:'gray',
    borderTopWidth:'1px',
    borderLeftWidth:'1px',
    borderBottomWidth:'0px',
    borderRightWidth:'0px',
    borderStyle:'solid',

    textAlign:'center',
    color:'#FFFFFF',
}

function BigStats({statsName, data, dataMilion}) {   
    return(
        <div style={cellStyle}>
            <p style={{fontSize:'36px'}}>{Number(data).toLocaleString()}</p>
            <p style={{color:'#ababab', marginTop:'-30px'}}>{statsName}</p>
            <p style={{color:'#ababab'}}>Per 1 Milion</p>
            <p style={{marginTop:'-15px', fontSize:'24px'}}>{Number(dataMilion).toLocaleString()}</p>
        </div> 
    );
}

export default BigStats;