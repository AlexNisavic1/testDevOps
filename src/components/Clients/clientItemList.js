import ClientItem from "./clientItem";


function ClientItemList (props){
    return (
        <ul>
             {props.clients.map((client)=>(
                <ClientItem key={client.id} client={client} onDelete={props.onDelete}/>
            ))}
        </ul>
        )
    
}

export default ClientItemList;