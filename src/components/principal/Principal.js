import React, { Fragment } from 'react';
import NavBar from '../navbar/NavBar';

const Principal = (props) => {
    const {IDUser} = props
    return (
        <Fragment>
            <NavBar id={IDUser}/>
            <p>Inicio</p>
        </Fragment>
    );
};

export default Principal;