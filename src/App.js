import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import './App.css';
import Layout from './components/Layout/layout';
import Timesheet from './pages/timesheets';
import Client from './pages/clients';
import Project from './pages/projects';
import Categories from './pages/categories';
import Worker from './pages/workers';
import Reports from './pages/reports';
import {useState} from "react";
import Login from "./components/Login/login"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn){
    return <Login/>
  }


  return (
    <section>
       <Router >
          <Layout/>
          <Routes>
            <Route path="./" element={<Timesheet/>} >         
            </Route>
          
        </Routes>
      </Router> 
    </section>
  );
}

export default App;
