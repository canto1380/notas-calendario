import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

/* Componentes */
import MsjError from '../mensajes/MsjError'

const Register = (props) => {

    /* State */
    // const [valUser, setValUser] = useState(false) // Bandera de datos
    const [err, setErr] = useState(false); // Bandera error coincidencia
    const [err1, setErr1] = useState(false); // Bandera falta datos
    const [claves, setClaves] = useState({
        contrasena: '',
        contrasena1: ''
    })
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        telefono: "",
        contrasena: ""
    });

    /* Varibles */
    let mensaje;

    /* Validaciones */
   

/* onChange */
const handleValores = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
};
const handleClaves = (e) => {
    setClaves({ ...claves, [e.target.name]: e.target.value })
}

/* onSUbmit */
const registrarse = (e) => {
    e.preventDefault();
    usuario.contrasena = claves.contrasena

    if (claves.contrasena !== claves.contrasena1) {
        setErr(true);
        setTimeout(() => {
            setErr(false);
        }, 2500);
        
    } else{
        // usuario.contrasena = claves.contrasena
        if (usuario.nombre === '' || usuario.apellido === '' || usuario.email === '' || usuario.telefono === '' || usuario.contrasena === '') {
            setErr1(true);
            setTimeout(() => {
                setErr1(false);
            }, 2500);
            
        } else {
            clienteAxios.post("/user/addUser", usuario)
            .then((req) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuario registrado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    
                }, 2000);
                props.history.push('/')
                })
                .catch((error) => {
                    alert('Email ya registrado.')
                })
        }
    }
};

/* Logica */
if (err) {
    mensaje = (
        <MsjError text1="Las claves ingresadas no coinciden." text2="Verifique." />
    )
}
if (err1) {
    mensaje = (
        <MsjError text1="Faltan datos por llenar." text2="Verifique." />
    )
}

return (
    <Fragment>
        <div className="container col col-sm-12 col-md-8 col-lg-6 my-5">
            <div className="row d-flex justify-content-center">
                <div className="text-center text-white mb-4">
                    <h1 className="">📝 Agenda Personal - Notas</h1>
                </div>
                <form className="border border-1 p-3" onSubmit={registrarse}>
                    <div className="text-center text-white mb-3">
                        <h4 className="">Formulario de registro</h4>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label text-white"
                        >
                            Nombre
              </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            aria-describedby="emailHelp"
                            placeholder="Alejandro"
                            onChange={handleValores}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label text-white"
                        >
                            Apellido
              </label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            name="apellido"
                            aria-describedby="emailHelp"
                            placeholder="Navarro"
                            onChange={handleValores}
                        />
                    </div>
                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label text-white"
                            >
                                Telefono
                </label>
                            <input
                                type="number"
                                className="form-control"
                                id="telefono"
                                name="telefono"
                                aria-describedby="emailHelp"
                                placeholder="3815479768"
                                onChange={handleValores}
                            />
                        </div>
                        <div className="col-sm-6 mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label text-white"
                            >
                                DNI
                </label>
                            <input
                                type="number"
                                className="form-control"
                                id="dni"
                                name="dni"
                                aria-describedby="emailHelp"
                                placeholder="11222333"
                                onChange={handleValores}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label text-white"
                        >
                            Email
              </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            placeholder="usuario@extension.com"
                            onChange={handleValores}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-white"
                        >
                            Clave
              </label>
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            name="contrasena"
                            onChange={handleClaves}
                        />
                        <p className="text-white fw-lighter">Debe tener al menos 8 caracteres</p>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-white"
                        >
                            Repetir Clave
              </label>
                        <input
                            type="password"
                            className="form-control"
                            id="clave"
                            name="contrasena1"
                            onChange={handleClaves}
                        />
                    </div>
                    <div className="pt-2 col text-center">
                        <button type="submit" className="btn btn-dark col-4">
                            Registrarse
              </button>
                    </div>
                    <div>{mensaje}</div>
                </form>
            </div>
        </div>
    </Fragment>
);
};

export default withRouter(Register);
