import React, { Fragment, useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";

/* eMailJS */
import emailjs, { init } from "emailjs-com";
init("user_d8hC0Go7hLQXucpk4fdgg");

const CodigoVerificacion = (props) => {
    const {user, emailRec, setIDRec} = props;
    const {email} = emailRec

    /* States */
    const [codigo, setCodigo] = useState('')

    /* Objeto datos */
    const userRecupero = {
        id: "",
        apellido: "",
        nombre: "",
        email: "",
        nuevaClave: ""
    }
    
    /* Buscar Datos */
    
        user.forEach(e => {
            if (email === e.email) {
                userRecupero.id = e._id;
                userRecupero.apellido = e.apellido;
                userRecupero.nombre = e.nombre;
                userRecupero.email = e.email;
                userRecupero.nuevaClave = e._id;
            } 
        })
    
    /* Funcion Enviar email */
    const enviarEmail = () => {
        emailjs.send("service_lcl3r81", "template_g7xqx7s", {
            from_name: userRecupero.nombre + " " + userRecupero.apellido,
            to_name: `${userRecupero.nombre}`,
            message: `Su nueva contrasena para reestablecer su cuenta es ${userRecupero.nuevaClave}`,
            reply_to: `${emailRec}`,
        });
    };
    enviarEmail();

    /* onChange */
    const codigoRecupero =(e)=>{
        setCodigo({ ...codigo, [e.target.name]: e.target.value })
    }

    const verificacion =(e) =>{
        e.preventDefault()
        setIDRec(userRecupero.id)
        if(userRecupero.id === codigo.codigo){
            props.history.push(`/RecuperarClave/IdUser/newPass=ID`);
        } else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Verifique el codigo y vuelva a intentarlo'
              })
        }
    }

    return (
        <Fragment>
            <div className="container col col-sm-12 col-md-8 col-lg-6 my-5">
                <div className="row d-flex justify-content-center">
                    <div className="text-center text-white mb-4">
                        <h1 className="">📝 Agenda Personal - Notas</h1>
                    </div>
                    <form className="border border-1 p-3" onSubmit={verificacion}>
                        <div className="text-white mb-3">
                            <h4 className="mb-2">Recuperar su clave</h4>
                            <p>Ingrese la nueva clave que recibio en su email</p>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="codigo"
                                name="codigo"
                                onChange={codigoRecupero}
                            />
                        </div>
                        <div className="pt-2 col text-end">
                            <button type="onSubmit" className="btn btn-dark">Verificar
                            </button>

                            <Link to={'/RecuperarClave'} className="btn btn-secondary  ms-2">
                                Cancelar
                            </Link >
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter (CodigoVerificacion);