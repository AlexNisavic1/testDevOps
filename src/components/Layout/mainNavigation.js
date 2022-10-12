import classes from "./mainNavigation.module.css"
import {Link} from 'react-router-dom'
import logo from "../../img/logo-large.png"

function MainNavigation (){
    return (
    <div> 
  
            <header className={classes.header}>
                <div className={logo}>
                <img src={logo} className={logo}/>
                </div>
                <nav>
                <base href=""></base>
                    <ul>
                       
                    
                    </ul>
                </nav>
            </header>  
     
    </div> )
}

export default MainNavigation;