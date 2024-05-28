"use client"
import React from 'react'
import GlobalContext from './globalContext';

function GlobalData(props: any) {


    let conn = null;

    const setConnection = (conn: any) => {
        conn = conn;
    }

    return (

        <GlobalContext.Provider value={{ conn, setConnection }} >
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalData