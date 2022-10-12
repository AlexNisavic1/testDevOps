import { useEffect, useState, useRef } from "react";
import CategoryListItem from '../components/Categories/categoryItemList';
import { toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from "../components/Filter/filter";
import '../components/ui/shared.css'
import Modal from "../components/ui/modal";

function Categories(){
    const [loadedCategories, setLoadedCategories]= useState([]);
    const [loadedFilteredCategories, setLoadedFilteredCategories]= useState([]);
    const [isFiltered,setIsFiltered]=useState(false);
    const [isNewCategory,setIsNewCategory]=useState(false);
    const url='http://localhost:64680/api/category/';
    const nameRef=useRef();


    useEffect(()=>{
        fetch(url)
        .then(response=>{
            return response.json();
        }).then(data=>{
            const categories=[];

            for(const key in data){
                const category={
                    id: key,
                    ...data[key]
                };

                categories.push(category);
            }

            setLoadedCategories(categories);
        });
    },[]);

    function deleteCategorie(key){

        
        fetch(url+key,{
            method:'delete',
            header:{'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(()=>{
                setLoadedCategories(loadedCategories.filter(function(category){
                    return category.id !== key
                }));

                toast.success('Delete was sucsessful!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            }).catch(err=>{
                toast.error('Error occured! Delete was not done.',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            })            
    }

    function filterCategories (key) {
        setLoadedFilteredCategories(loadedCategories.filter(function(category){
            return category.name.charAt(0)===key
        }))
        setIsFiltered(true);
    }

    function toggleFilter(){
        setIsFiltered(!isFiltered);
    }

    function toggleIsNewCategory (){
        setIsNewCategory(!isNewCategory);
    }

    async function addCategory (event) {
        event.preventDefault();  
        
        if (nameRef.current.value===""){
            toast.warning('Category name is required.',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
            throw "exit";
        }

        loadedCategories.forEach(category => {
            if (category.name===nameRef.current.value){
                toast.warning('Category with the same name already exists!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
                throw "exit";
            }
        });
 
        try{
            let result = await fetch(url,{
                method:'post',
                headers: {'Content-Type':'application/json',
                'Accept':'application/json'},
                mode: 'cors',
                body: JSON.stringify({name: nameRef.current.value})
                })
                 console.log('result ' + result);    
                toast.success('Client was successfully saved!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})   
                toggleIsNewCategory();         
        }catch(e){
            console.log(e);
            toast.error('Error occured!',{position: toast.POSITION.TOP_CENTER, transition:Zoom})
        }
    }

    return (<section>
        <Filter onClick={filterCategories}/>
        <div className="container">
            <div className="newItem" onClick={toggleIsNewCategory}> Create new category</div> 
                {isNewCategory ? (<Modal>
                    <form>
                    <label>Category name: </label>
                            <input type="text" id="name" ref={nameRef} required></input>
                        <div>
                            <button onClick={addCategory}> Save </button>
                            <button onClick={toggleIsNewCategory}>Cancel</button>
                        </div>   
                    </form>
                </Modal>) : null}
        </div>
        <div>{isFiltered ? <div className="filter" onClick={toggleFilter}>Filter x </div>  : null}</div>
        <CategoryListItem categories={isFiltered ? loadedFilteredCategories : loadedCategories} onDelete={deleteCategorie}/>
    </section>
    )
}

export default Categories;