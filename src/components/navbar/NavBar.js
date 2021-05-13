import React, { Fragment } from 'react';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css"

const NavBar = (props) => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href={'/'}>Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href={'/'} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="rounded-circle bg-insignia text-insignia text-white fw-bolder p-1">{props.id}</span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item px-2" href={'/'}><FontAwesomeIcon icon={faBell} className="mx-2"/>Notificaciones</a></li>
                                    <li><a className="dropdown-item" href={'/'}><FontAwesomeIcon icon={faCog}/>Configuracion</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={'/'}><FontAwesomeIcon icon={faSignOutAlt} size="2x"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </Fragment>
    );
};

export default NavBar;