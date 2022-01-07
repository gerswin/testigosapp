import { Routes, Route,  } from 'react-router-dom';
import {useState} from "react";
import Login from './login/Login'
import AsistenciaPuestosVotacion from './asistenciaPuestosVotacion/AsistenciaPuestosVotacion'

function App(props) {

  const [redirect, setRedirect] = useState()
  return (
      <div className='App'>
          <Routes>
              <Route path="/" element={ <Login/> } />
              <Route path="informes_asistencia" element={ <AsistenciaPuestosVotacion/> }/>
          </Routes>
      </div>
  );
}

export default App;
