import { Routes, Route,  } from 'react-router-dom';
import {useState} from "react";
import Login from './components/login/Login'
import AsistenciaPuestosVotacion from './components/asistenciaPuestosVotacion/AsistenciaPuestosVotacion'
import {theme} from "./theme/themeStyles";
import { ThemeProvider } from '@mui/material/styles';
import ForgotPassword from "./components/login/ForgotPassword";
import PasswordRecover from "./components/login/PasswordRecover";
import InformacionGeneral from "./components/informacionGeneral/InformacionGeneral";

function App(props) {

  const [redirect, setRedirect] = useState()

  return (
      <ThemeProvider theme={theme}>
          <div className='App'>
              <Routes>
                  <Route path="/" element={ <Login/> } />
                  <Route path="informes_asistencia" element={ <AsistenciaPuestosVotacion/> }/>
                  <Route path="cambiar_contrasena" element={ <ForgotPassword/> }/>
                  <Route path="restablecer_contrasena" element={ <PasswordRecover/> }/>
                  <Route path="informacion_general" element={ <InformacionGeneral/> }/>
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
