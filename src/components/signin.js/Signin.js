import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
/* Componentes */
import MsjError from "../mensajes/MsjError";

const Signin = (props) => {
  /* Props */
  const {setIDUser} = props
  /* State */
  const [err, setErr] = useState(false); // Bandera
  const [usuario, setUsuario] = useState({
    email: "",
    contrasena: "",
  });
  const validacion = {
    id: "",
    token: "",
  };

  /* Variables */
  let mensaje;

  /* onChange */
  const handleValores = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  /* onSubmit */
  const ingresar = (e) => {
    e.preventDefault();
    clienteAxios
      .post("/user/signin", usuario)
      .then((req) => {
        /**Local storage **/
        validacion.id = req.data._id;
        validacion.token = req.data.token;
        localStorage.setItem("bcryptNotas", JSON.stringify(validacion));

        setIDUser(req.data._id)
        console.log(req.data._id)
        

        /*Swal */
        let timerInterval;
        Swal.fire({
          title: "Iniciando sesion",
          html: "",
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            props.history.push("/Inicio");
          }
        });
      })
      .catch((err) => {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      });
  };

  /* Logica error */
  if (err) {
    mensaje = (
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
              <h4 className="">Inicio de Sesion</h4>
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
                id="clave"
                name="contrasena"
                onChange={handleValores}
              />
              <div className="valid-feedback"></div>
              <div className="invalid-feedback">Clave no valida</div>
            </div>
            <div className="pt-2 col text-center">
              <button type="submit" className="btn btn-dark col-4">
                Ingresar
              </button>
            </div>
            <div>{mensaje}</div>
            <hr className="text-white" />
            <div className="form-check text-center px-0 mt-3 mb-0">
              <Link
                to={"/RecuperarClave"}
                // onClick={() => abrirCerrarModal()}
                className=" text-white text-decoration-none"
              >
                ¿Olvido su clave? Click aqui
              </Link>
            </div>

            <div className="form-check text-center px-0 mt-2 mb-0">
              <Link to={'/Registro'} className=" text-white text-decoration-none">
                <p>¿No tienes cuenta? Registrate!</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Signin);
