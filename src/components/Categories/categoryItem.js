import  '../ui/shared.css';
import {useState} from 'react/cjs/react.development'
import '../../dist/output.css'


function CategoryItem (props){
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleIsExpanded (){
        setIsExpanded(!isExpanded);
    }
    
    return(
            <li className="list">
                <div className="card">
                    <h3>{props.category.name} </h3>
                    <img className={isExpanded ? "expandLess" : "expandMore" } onClick={toggleIsExpanded}></img>  
                    <div >
                        {isExpanded ?
                        <div className="expandedCard">
                               <h3>{props.category.name}</h3> 
                               <button onClick={()=>{(props.onDelete(props.category.id))}} > Delete</button>
                        </div>
                     
                        : null}
                    </div>
                    
                </div>
            </li>
        );
}

export default CategoryItem;