import {useState, useEffect} from 'react/cjs/react.development';
import ClientItemList from '../components/Clients/clientItemList';
import Filter from '../components/Filter/filter';
import { toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/ui/shared.css';
import { useRef } from 'react';
import Modal from '../components/ui/modal';
import ClientApi from '../API/ClientApi';


function Client(){
    const [loadedClients, setLoadedClients] = useState([]);
    const [filteredClients, setFilteredClients]=useState([]);
    const [isfiltered, setIsFiltered]= useState(false);
    const [isNewClient, setIsNewClient] = useState(false);
    const url='http://localhost:64680/api/client/';
    const urlCountries = 'http://localhost:64680/api/country/';
    const [loadedCountries, setLoadedCountries]= useState([]);

    const nameRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const zipCodeRef= useRef();
    const countryRef = useRef();

    useEffect(()=>{
        fetch(url)
        .then(response=>{
            return response.json()
        }).then(data=>{
            const clients=[];

            for(const key in data){
                const client = {
                    id: key,
                    ... data[key]
                };

                clients.push(client);
            }
            
            setLoadedClients(clients);
        })

        fetch(urlCountries)
        .then(response=>{
            return response.json()
        }).then(data=>{
            const countries=[];

            for(const key in data){
                const country = {
                    id: key,
                    ... data[key]
                };

                countries.push(country);
            }
            
            setLoadedCountries(countries);
        })
    },[])

    function deleteClient(key){
        fetch(url+key,{
            method:'delete',
            header:{'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(()=>{
                setLoadedClients(loadedClients.filter(function(client){
                    return client.id !== key
                }));

                toast.success('Delete was sucsessful!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            }).catch(err=>{
                toast.error('Error occured! Delete was not done.',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            })
            
          
    }

    async function addClient(event){

        event.preventDefault();

        const clientData = {
            name : nameRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            postalCode: zipCodeRef.current.value,
            country : {
                name : "",
                countryCode : parseInt(countryRef.current.value)
            }
        }

        let allClients=[];

        try{
            let result = await fetch(url,{
                method:'post',
                headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
                mode: 'cors',
                body: JSON.stringify(clientData)
                })
                 console.log('result ' + result);    
                toast.success('Client was successfully saved!',{position: toast.POSITION.TOP_CENTER, transition:Zoom});
                setIsNewClient(false);   
                clientData.id=loadedClients.length;
                allClients=loadedClients;
                allClients.push(clientData) 
                setLoadedClients(allClients)     
        }catch(e){
            console.log(e);
            toast.error('Error occured!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
        }
      
          
    }

    function filterClients(key){
        setFilteredClients(loadedClients.filter(function(client){
            return client.name.charAt(0)===key
        }))

        setIsFiltered(true);
    }

    function toggleFilter () {
        setIsFiltered(!isfiltered)
    }

    function toggleNewClient(){
        setIsNewClient(!isNewClient);
    }

    return (<section> 
        <Filter onClick={filterClients} />
        <div>
            {isfiltered ? <div className="filter" onClick={toggleFilter}>Filter x </div> : null}
        </div>        
        <div className="container">
            <div className="newItem" onClick={toggleNewClient}> Create new client</div> 
                {isNewClient ? (
                    <Modal>
                        <div>
                        <form>
                            <label>Client name: </label>
                            <input type="text" id="name" ref={nameRef}></input>

                            <label>Address: </label>
                            <input type="text" id="address" ref={addressRef}></input>

                            <label>City: </label>
                            <input type="text" id="city" ref={cityRef}></input>

                            <label>Zip/Postal Code: </label>
                            <input type="text" id="zipcode" ref={zipCodeRef}></input>

                            <label>Country</label>
                            <select name="Country" id="country" ref={countryRef}> 
                                   {loadedCountries.map((country)=>
                                   <option value={country.countryCode} key={country.countryCode}>{country.name}</option>)}
                            </select>
                            <div>
                                <button onClick={addClient}> Save </button>
                                <button onClick={toggleNewClient}>Cancel</button>
                            </div>               
                        </form>  
                        </div>  
                    </Modal> ) : null }                
            <ClientItemList clients={isfiltered ? filteredClients : loadedClients} onDelete={deleteClient}/> 
        </div>
    </section>);
}

export default Client;