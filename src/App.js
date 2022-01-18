import { Routes, Route,  } from 'react-router-dom';
import {useState} from "react";
import Login from './components/login/Login'
import AsistenciaPuestosVotacion from './components/asistenciaPuestosVotacion/AsistenciaPuestosVotacion'
import {theme} from "./theme/themeStyles";
import { ThemeProvider } from '@mui/material/styles';
import ForgotPassword from "./components/login/ForgotPassword";
import PasswordRecover from "./components/login/PasswordRecover";
import InformacionGeneral from "./components/informacionGeneral/InformacionGeneral";
import Home from './components/home/Home'
import SubModuloInformePuesto from "./components/home/SubModuloInformePuesto";
import InformeKitElectoral from './components/informeKitElectoral/InformeKitElectoral'
import InformesPuestosVotacion2 from './components/informeKitElectoral/InformesPuestosVotacion2'
import InformesPuestosVotacion3 from "./components/informeKitElectoral/InformesPuestosVotacion3";
import InformesPuestosVotacion5 from "./components/informeKitElectoral/InformesPuestosVotacion5";
import InformesPuestosVotacion6 from "./components/informeKitElectoral/InformesPuestosVotacion6";

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
                  <Route path="submodulo_informes_puesto" element={ <SubModuloInformePuesto/> }/>
                  <Route path="informe_kit_electoral" element={ <InformeKitElectoral/>  } />
                  <Route path="informes_puestos_votacion2" element={ <InformesPuestosVotacion2/>  } />
                  <Route path="informes_puestos_votacion3" element={ <InformesPuestosVotacion3/>  } />
                  <Route path="informes_puestos_votacion5" element={ <InformesPuestosVotacion5/>  } />
                  <Route path="informes_puestos_votacion6" element={ <InformesPuestosVotacion6/>  } />
                  <Route path="home" element={ <Home/> }/>
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
