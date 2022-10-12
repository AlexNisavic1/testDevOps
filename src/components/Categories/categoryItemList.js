import CategoryItem from "./categoryItem";


function CategoryListItem (props){    
    return (
        <ul>
            {props.categories.map((category)=>(
                <CategoryItem category={category} key={category.id}  
                 onDelete={props.onDelete}/>
            ))}
         </ul>
    )
}

export default CategoryListItem;