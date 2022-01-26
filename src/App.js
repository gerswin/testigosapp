import { Routes, Route,  } from 'react-router-dom';
import {useState} from "react";
import Login from './components/login/Login'
import AsistenciaPuestosVotacion from './components/asistenciaPuestosVotacion/AsistenciaPuestosVotacion'
import {theme} from "./theme/themeStyles";
import { ThemeProvider } from '@mui/material/styles';
//aws

//components
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
import InformesPuestosVotacion7 from "./components/informeKitElectoral/InformesPuestosVotacion7";
import InformesPuestosVotacion8 from "./components/informeKitElectoral/InformesPuestosVotacion8";
import InformesPuestosVotacion9 from "./components/informeKitElectoral/InformesPuestosVotacion9";
import InformesPuestosVotacion10 from "./components/informeKitElectoral/InformesPuestosVotacion10";
import InformesPuestosVotacion11 from "./components/informeKitElectoral/InformesPuestosVotacion11";
import InformesPuestosVotacion12 from "./components/informeKitElectoral/InformesPuestosVotacion12";
import RecomendacionesEncuesta from "./components/recomendaciones/RecomendacionesEncuesta";
import NovedadesProcesoEleccion from "./components/recomendaciones/NovedadesProcesoEleccion";
import VerificarCredencialE15 from "./components/credencialE15/VerificarCredencialE15";
import VerificarCredencialE15Info from "./components/credencialE15/VerificarCredencialE15Info";
import GenerarCredencialDelegado from "./components/credencialE15/GenerarCredencialDelegado";
import Alertas from "./components/alertas/Alertas";

//process.env.NODE_ENV = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'prod'
//dotenv.config({ path: `./dotenv/${process.env.NODE_ENV}/.env`})

function App(props) {

  const [redirect, setRedirect] = useState()

  return (
      <ThemeProvider theme={theme}>
          <div className='App'>
              <Routes>
                  <Route path="/" element={ <Login/> } />
                  <Route path="home" element={ <Home/> }/>
                  <Route path="informes_asistencia" element={ <AsistenciaPuestosVotacion/> }/>
                  <Route path="informe_puesto_de_votacion" element={ <InformacionGeneral/> }/>
                  <Route path="cambiar_contrasena" element={ <ForgotPassword/> }/>
                  <Route path="restablecer_contrasena" element={ <PasswordRecover/> }/>
                  <Route path="informacion_general" element={ <InformacionGeneral/> }/>
                  <Route path="submodulo_informes_puesto" element={ <SubModuloInformePuesto/> }/>
                  <Route path="informe_kit_electoral" element={ <InformeKitElectoral/>  } />
                  <Route path="informes_puestos_votacion2" element={ <InformesPuestosVotacion2/>  } />
                  <Route path="informes_puestos_votacion3" element={ <InformesPuestosVotacion3/>  } />
                  <Route path="informes_puestos_votacion5" element={ <InformesPuestosVotacion5/>  } />
                  <Route path="informes_puestos_votacion6" element={ <InformesPuestosVotacion6/>  } />
                  <Route path="informes_puestos_votacion7" element={ <InformesPuestosVotacion7/>  } />
                  <Route path="informes_puestos_votacion8" element={ <InformesPuestosVotacion8/>  } />
                  <Route path="informes_puestos_votacion9" element={ <InformesPuestosVotacion9/>  } />
                  <Route path="informes_puestos_votacion10" element={ <InformesPuestosVotacion10/>  } />
                  <Route path="informes_puestos_votacion11" element={ <InformesPuestosVotacion11/>  } />
                  <Route path="informes_puestos_votacion12" element={ <InformesPuestosVotacion12/>  } />
                  <Route path="informes_puestos_votacion12" element={ <InformesPuestosVotacion12/>  } />
                  <Route path="recomendaciones_encuesta" element={ <RecomendacionesEncuesta/>  } />
                  <Route path="novedades_proceso_eleccion" element={ <NovedadesProcesoEleccion/>  } />
                  <Route path="verificar_credencial_e15" element={ <VerificarCredencialE15/>  } />
                  <Route path="verificar_credencial_e15info" element={ <VerificarCredencialE15Info/>  } />
                  <Route path="generar_credencial_delegado1" element={ <GenerarCredencialDelegado/>  } />
                  <Route path="alertas" element={ <Alertas/>  } />
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;