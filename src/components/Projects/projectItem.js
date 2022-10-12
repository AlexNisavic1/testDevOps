import styles from '../ui/shared.css';
import {useEffect, useState} from 'react/cjs/react.development'

function ProjectItem (props)
{

    const [isExpanded, setIsExpanded] = useState(false);

    function toggleIsExpanded (){
        setIsExpanded(!isExpanded);
    }

   

    return (
        <li className="list">
            <div className="card" >
                <h3>{props.project.projectName}</h3>
                <img className={isExpanded ? "expandLess" : "expandMore" } onClick={toggleIsExpanded}></img>  
                <div >
                        {isExpanded ?
                        <div className="expandedCard">
                               <h3>{props.project.description}</h3> 
                               <button onClick={()=>{(props.onDelete(props.project.id))}}> Delete</button>
                        </div>
                     
                        : null}
                </div>
            </div>
        </li>
    )
}

export default ProjectItem;