import React, { Fragment, useState, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";

const RecuperarClave = (props) => {
    const { setEmailRec } = props;
    /* State */
    const [emailR, setEmailR] = useState('')
    const emailRef = useRef("")
   
    /* onChange */
    const handleEmailRecupero = (e) => {
        setEmailR({ ...emailR, [e.target.name]: e.target.value })
    }
    
    /* onSubmit*/
    const recuperarClave = (e) => {
        e.preventDefault();
        console.log(emailRef)
        setEmailRec(emailR)
        if(emailR === ''){
            alert('Campo de email vacio')
        } else{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Email enviado. Verifique su casilla de correo',
                showConfirmButton: false,
                timer: 1500
              })
            props.history.push(`/RecuperarClave/IdUser/${emailR}`);
            console.log(emailR)
        }
    };
   
    return (
        <Fragment>
            <div className="container col col-sm-12 col-md-8 col-lg-6 my-5">
                <div className="row d-flex justify-content-center">
                    <div className="text-center text-white mb-4">
                        <h1 className="">📝 Agenda Personal - Notas</h1>
                    </div>
                    <form className="border border-1 p-3" onSubmit={recuperarClave}>
                        <div className="text-white mb-3">
                            <h4 className="mb-2">Recuperar su clave</h4>
                            <p>Ingrese su email con el cual se registro en la pagina y se le enviara una clave de recuperacion</p>
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                                placeholder="usuario@extension.com"
                                ref={emailRef}
                                onChange={handleEmailRecupero}
                            />
                        </div>
                        <div className="pt-2 col text-end">
                            <button type="submit" className="btn btn-dark">
                                Enviar
                            </button>
                            <Link to={'/'} className="btn btn-secondary  ms-2">
                                Cancelar
                            </Link >
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(RecuperarClave);
