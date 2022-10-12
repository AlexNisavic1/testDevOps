import WorkerItem from './workerItem';

function WorkerItemList (props) {
    return (<ul>
            {props.workers.map((worker)=>(
                <WorkerItem worker={worker} key={worker.id}  onDelete={props.onDelete}/>
            ))}
    </ul>)
}

export default WorkerItemList;