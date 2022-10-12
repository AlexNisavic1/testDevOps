import  '../ui/shared.css';
import {useState} from 'react/cjs/react.development'


function ClientItem (props) {
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleIsExpanded (){
        setIsExpanded(!isExpanded);
    }
    return(
        <li className="list"> 
            <div className="card"> 
                <h3>{props.client.name}</h3> 
                <img className={isExpanded ? "expandLess" : "expandMore" } onClick={toggleIsExpanded}></img>  
                <div >
                        {isExpanded ?
                        <div className="expandedCard">
                            <div className="itemDetails">
                               <p>Address: </p> <p> {props.client.address}</p>
                            </div>
                            <div className="itemDetails">
                               <p>City: </p> <p> {props.client.city}</p> 
                            </div> 
                            <div className="itemDetails">
                               <p>Zip code: </p> <p> {props.client.postalCode}</p>
                            </div>
                            <div className="itemDetails">
                                <p>Country: </p> <p> {props.client.country.name}</p>   
                                <button onClick={()=>{(props.onDelete(props.client.id))}}> Delete </button>                           
                            </div>
                           
                        </div>                     
                        : null}
                </div>
            </div>
        </li>
    )
}

export default ClientItem;