import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import MsjError from "../mensajes/MsjError";

const NuevaClave = (props) => {
    const { user, emailRec, IDRec } = props
    const { email } = emailRec

    /* State */
    const [err, setErr] = useState(false); // Bandera
    const [claves, setClaves] = useState({
        contrasena: '',
        contrasena1: ''
    })

    /* Variables */
    let msj;

    /* Objeto datos */
    const userUpdate = {

        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        telefono: "",
        dni: "",
    }

    /* Buscar Datos */
    user.forEach(e => {
        if (email === e.email) {
            userUpdate.apellido = e.apellido;
            userUpdate.nombre = e.nombre;
            userUpdate.email = e.email;
            userUpdate.contrasena = claves.contrasena;
            userUpdate.telefono = e.telefono;
            userUpdate.dni = e.dni;
        }
    })

    /* onChange */
    const handleValores = (e) => {
        setClaves({
            ...claves, [e.target.name]: e.target.value
        })
    }
    /* onSubmit */
    const ingresar = (e) => {
        e.preventDefault()

        clienteAxios.put(`user/updateUser/${IDRec}`, userUpdate)
            .then(req => {
                if (claves.contrasena !== claves.contrasena1 || claves.contrasena === '') {
                    setErr(true);
                    setTimeout(() => {
                        setErr(false);
                    }, 3000);
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario actualizado con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    props.history.push('/')
                }
            })
            .catch(err => {

            })
    }

    /* Logica error */
    if (err) {
        msj = (
            <MsjError text1="Datos incorrectos." text2="Intentelo nuevamente." />
        );
    }

    return (
        <Fragment>
            <div className="container col col-sm-12 col-md-8 col-lg-6 my-5">
                <div className="row d-flex justify-content-center">
                    <div className="text-center text-white mb-4">
                        <h1 className="">📝 Agenda Personal - Notas</h1>
                    </div>
                    <form className="border border-1 p-3" onSubmit={ingresar}>
                        <div className="text-center text-white mb-3">
                            <h4 className="">Cambio de clave</h4>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label text-white"
                            >
                                Ingrese su nueva clave
              </label>
                            <input
                                type="password"
                                className="form-control"
                                id="clave"
                                name="contrasena"
                                onChange={handleValores}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label text-white"
                            >
                                Repite su nueva clave
              </label>
                            <input
                                type="password"
                                className="form-control"
                                id="clave"
                                name="contrasena1"
                                onChange={handleValores}
                            />
                        </div>
                        <div className="pt-2 col text-center">
                            <button type="submit" className="btn btn-dark col-4">
                                Confirmar
                            </button>
                        </div>
                    </form>
                    <div>{msj} </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(NuevaClave);
