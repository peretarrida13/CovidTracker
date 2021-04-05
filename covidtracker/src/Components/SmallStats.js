import React from 'react';

const cellStyle = {
    backgroundColor:'#2D2D2D',

    borderColor:'gray',
    borderTopWidth:'1px',
    borderLeftWidth:'1px',
    borderBottomWidth:'1px',
    borderRightWidth:'0px',
    borderStyle:'solid',

    textAlign:'center',
    color:'#FFFFFF',
}

function SmallStats({statsName, data}) {
    return(
        <div style={cellStyle}>
            <p style={{fontSize:'36px'}}>{Number(data).toLocaleString()}</p>
            <p style={{color:'#ababab', marginTop:'-25px'}}>{statsName}</p>
        </div>
    );
}

export default SmallStats;