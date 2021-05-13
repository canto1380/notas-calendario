import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import clienteAxios from './config/axios'
import './App.css';

import Signin from './components/signin.js/Signin'
import Principal from './components/principal/Principal'
/* Recuperacion de clave */
import Recuperar from './components/recuperarClave.js/RecuperarClave'
import CodigoVerificacion from './components/recuperarClave.js/CodigoVerificacion'
import NuevaClave from './components/recuperarClave.js/NuevaClave'
/* Registrarse como usuario */
import Register from './components/register.js/Register'
function App() {

  /* Datos de las notas de la DB */
  const [notas, setNotas] = useState([])
  const [consultarNotas, setConsultarNotas] = useState(true)
  /* Datos de los usuarios de la DB */
  const [user, setUser] = useState([])
  const [consultarUser, setConsultarUser] = useState(true)
  
  /* ID y Email para recuperar clave */
  const [IDRec, setIDRec] = useState('')
  const [emailRec, setEmailRec] = useState('')
  /*ID user signin*/
  const [IDUser, setIDUser] = useState('')

  useEffect(() => {
    const consultarAPI = () => {
        if (consultarNotas) {
        clienteAxios.get('notas/listNota')
          .then(req => {
            setNotas(req.data);
            setConsultarNotas(false)
            console.log(notas)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
      consultarAPI();
  }, [consultarNotas])

  useEffect(() => {
    if (consultarUser) {
      const consultarAPI = () => {
        clienteAxios.get('user/listUser')
          .then(req => {
            setUser(req.data);
            setConsultarUser(false)
          })
          .catch(err => {
            console.log(err)
          })
      }
      consultarAPI();
    }
  }, [consultarUser])

  return (
    <Router>
      <Switch>
        {/* SignIn */}
        <Route exact path="/" component={() =>
          <Signin setIDUser={setIDUser}
          />
        } 
        />

        {/* Recuperar clave */}
        <Route exact path="/RecuperarClave" component={() =>
          <Recuperar  user={user}
                      emailRec={emailRec}
                      setEmailRec={setEmailRec}
          />
        } 
        />
        <Route exact path="/RecuperarClave/IdUser/:id" component={() =>
          <CodigoVerificacion user={user}
                              emailRec={emailRec}
                              setIDRec={setIDRec}
          />
        } 
        />

        <Route exact path="/RecuperarClave/IdUser/newPass=ID" component={() =>
          <NuevaClave   user={user}
                        emailRec={emailRec}
                        IDRec={IDRec}
          />
        } 
        />

        {/* Registrarse */}
        <Route exact path="/Registro" component={() =>
          <Register
            user={user}
          />
        } />

        {/* Principal */}
        <Route exact path="/Inicio" component={() =>
          <Principal
          IDUser={IDUser}
          />
          }
        />

      </Switch>
    </Router>
  );
}

export default App;
