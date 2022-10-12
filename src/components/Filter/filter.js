import classes from './filter.module.css';

function Filter (props){
    let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));

    return (
        
        <div className={classes.containter}>
            {alphabet.map((char)=>
                <div className={classes.char} onClick={()=>{(props.onClick(char))}} key={char}> 
                    {char} 
                </div>
            )}
        </div>
  
        )
}

export default Filter;