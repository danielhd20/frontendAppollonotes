import './App.css';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Test from './components/testAprendizaje';
import Tema from './components/tema';
import Prueba from './components/pruebaFinal';
import NotFound from './components/404';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
  <Router>
    <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/testAprendizaje/:id" element={<Test/>}/>
       <Route path="/tema" element={<Tema/>}/>
       <Route path='/prueba' element={<Prueba/>}/>
       <Route path='/404' element={<NotFound/>}/>       
    </Routes>
 </Router>
  );
}

export default App;
