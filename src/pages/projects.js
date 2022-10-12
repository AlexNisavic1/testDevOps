import {useState, useEffect, useRef} from 'react/cjs/react.development'
import ProjectItemList from '../components/Projects/projectItemList';
import { toast ,Zoom} from 'react-toastify';
import Filter from '../components/Filter/filter';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/ui/modal';

toast.configure()
function Project(){

    const [loadedProjects, setLoadedProjects] = useState([]);
    const [filteredProjects, setFilteredProjects]=useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [newProject, setNewProject] = useState(false);
    const [loadedWorkers, setLoadedWorkers] = useState([]);
    const [loadedClients, setLoadedClients] = useState([]);
    const url='http://localhost:64680/api/project/';
    const workersUrl = 'http://localhost:64680/api/worker/';
    const clientUrl = 'http://localhost:64680/api/client/';

    const nameRef = useRef();
    const descriptionRef = useRef();
    const clientIdRef = useRef();
    const leadIdRef= useRef();

    useEffect(()=>{
        fetch(url)
        .then(response=>{
            return response.json()
        }).then(data=>{
            const projects=[];

            for(const key in data){
                const project = {
                    ... data[key]
                };

                projects.push(project);
            }
            
            setLoadedProjects(projects);
        })

        fetch(workersUrl)
        .then(response=>{
            return response.json()})
        .then(data=>{
            const workers =[];

            for (const key in data){
                const worker = {
                    ...data[key]
                };

                workers.push(worker);
            }

            setLoadedWorkers(workers);
        })

        fetch(clientUrl)
        .then(response=>{
            return response.json()})
        .then(data=>{
            const clients =[];

            for (const key in data){
                const client = {
                    ...data[key]
                };

                clients.push(client);
            }

            setLoadedClients(clients);
        })
    },[])



    function deleteProject(key){
        fetch(url+key,{
            method:'delete',
            header:{'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(()=>{
                setLoadedProjects(loadedProjects.filter(function(project){
                    return project.id !== key
                }));

                toast.success('Delete was sucsessful!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            }).catch(err=>{
                toast.error('Error occured! Delete was not done.',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            })             
    }

    function filterProjects(key) {
        setFilteredProjects(loadedProjects.filter(function(project){
            return project.projectName.charAt(0)===key
        }))
        setIsFiltered(true);
    }

    function toggleFilter() {
        setIsFiltered(!isFiltered);
    }

    function toggleNewProject () {
        setNewProject(!newProject);
    }

    async function  addNewProject (event) {
        event.preventDefault();
        const project={
            "projectName": nameRef.current.value,
            "description": descriptionRef.current.value,
            "client":{
                "id": parseInt(clientIdRef.current.value)
            },
            "workers":null,
            "teamLead":{
                "id": parseInt(leadIdRef.current.value)
            }
        }

        let allProjects=[];

        try{
            let result = await fetch(url,{
                method:'post',
                headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
                mode: 'cors',
                body: JSON.stringify(project)
                })
                 console.log('result ' + result);    
                toast.success('Project was successfully saved!',{position: toast.POSITION.TOP_CENTER, transition:Zoom});
                setNewProject(false);   
                project.id=loadedProjects.length;
                allProjects=loadedProjects;
                allProjects.push(project) 
                setLoadedProjects(allProjects)     
        }catch(e){
            console.log(e);
            toast.error('Error occured!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
        }

    }

    return (<section>
              <Filter onClick={filterProjects}/>
              <div>{isFiltered ? <div className="filter" onClick={toggleFilter}>Filter x </div>  : null}</div>
              <div className="container">
                    <div className="newItem" onClick={toggleNewProject}> Create project</div> 
                    {newProject ? (
                    <Modal>
                        <div>
                        <form>

                            <label>Project name: </label>
                            <input type="text" id="name" ref={nameRef} ></input>

                            <label>Description: </label>
                            <input type="text" id="address" ref={descriptionRef} ></input>

                            <label>client </label>
                            <select name="client" id="client" ref={clientIdRef}> 
                                    <option value={null} key={null}>---</option>    
                                    {loadedClients.map((client)=>
                                   <option value={client.id} key={client.id}>{client.name}</option>)}
                            </select>

                            <label>Lead: </label>
                            <select name="lead" id="lead" ref={leadIdRef}> 
                                    <option value={null} key={null}>---</option>    
                                    {loadedWorkers.map((worker)=>
                                    <option value={worker.id} key={worker.id}>{worker.name} </option>)}
                            </select>

                            <div>
                                <button onClick={addNewProject}> Save </button>
                                <button onClick={toggleNewProject}>Cancel</button>
                            </div>   

                        </form>  
                        </div>  
                    </Modal> ) : null }    
              </div>
            <ProjectItemList projects={isFiltered ? filteredProjects : loadedProjects} onDelete={deleteProject}/> 
        </section>)
}

export default Project;