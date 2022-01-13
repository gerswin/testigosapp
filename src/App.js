import { Routes, Route,  } from 'react-router-dom';
import {useState} from "react";
import Login from './login/Login'
import AsistenciaPuestosVotacion from './asistenciaPuestosVotacion/AsistenciaPuestosVotacion'
import {theme} from "./theme/themeStyles";
import { ThemeProvider } from '@mui/material/styles';
import ForgotPassword from "./login/ForgotPassword";


function App(props) {

  const [redirect, setRedirect] = useState()

  return (
      <ThemeProvider theme={theme}>
          <div className='App'>
              <Routes>
                  <Route path="/" element={ <Login/> } />
                  <Route path="informes_asistencia" element={ <AsistenciaPuestosVotacion/> }/>
                  <Route path="cambiar_contrasena" element={ <ForgotPassword/> }/>

              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
