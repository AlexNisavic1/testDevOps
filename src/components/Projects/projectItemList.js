import ProjectItem from "./projectItem";


function ProjectItemList (props){
    return(
        <ul>
            {props.projects.map((project)=>(
                <ProjectItem project={project} key={project.id}
                 onDelete={props.onDelete}/>
            ))}
        </ul>
    )
}

export default ProjectItemList;