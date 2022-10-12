import WorkerItemList from '../components/Workers/workerItemList'
import {useState, useEffect} from 'react/cjs/react.development';
import { toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/ui/modal';
import { useRef } from 'react';

function Worker(){
    const [loadedWorkers,setLoadedWorkers] = useState([]);
    const url='http://localhost:64680/api/worker/';
    const [isNewWorker, setIsNewWorker] = useState(false);
    const nameRef= useRef();
    const hoursRef = useRef();
    const usernameRef = useRef();
    const emailRef= useRef();

    useEffect(()=>{
        fetch(url)
        .then(response=>{
            return response.json()
        }).then(data=>{
            const workers=[];

            for(const key in data){
                const worker = {
                    id: key,
                    ... data[key]
                };

                workers.push(worker);
            }
            
            setLoadedWorkers(workers);
        })
    },[])

    function deleteWorker(key){
        fetch(url+key,{
            method:'delete',
            header:{'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(()=>{
                setLoadedWorkers(loadedWorkers.filter(function(worker){
                    return worker.id !== key
                }));

                toast.success('Delete was sucsessful!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            }).catch(err=>{
                toast.error('Error occured! Delete was not done.',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            })             
    }

    function toggleNewWorkerk () {
        setIsNewWorker(!isNewWorker);
    }

    function addTeamMember () {
        setIsNewWorker(false);
    }

    return (
        <section>
            <div className="container">
             <div className="newItem" onClick={toggleNewWorkerk}> Create new team member</div>    
            {isNewWorker ? ( <Modal> 
                <form>
                    <label>Name: </label>
                    <input type="text" id="name" ref={nameRef}></input>

                    <label>Hours per week: </label>
                    <input type="text" id="hours" ref={hoursRef}></input>

                    <label>Username: </label>
                    <input type="text" id="username" ref={usernameRef}></input>

                    <label>Email: </label>
                    <input type="text" id="email" ref={emailRef}></input>
                    <div>
                        <button onClick={addTeamMember}> Save </button>
                        <button onClick={toggleNewWorkerk}>Cancel</button>
                    </div>   
                </form>        
            </Modal> ): null}
            </div>
            <WorkerItemList workers={loadedWorkers} onDelete={deleteWorker}/>
        </section>
    )
}

export default Worker;