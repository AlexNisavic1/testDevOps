import  classes from './calenderRow.module.css';

function CalanderRow(props){
    return (
   
        <tr>
            {props.row.map((day, index)=>(
            <td key={index} 
            className={day.isNotCurrentMonth? classes.lastMonth : classes.currentMonth} 
            onClick={()=>{(props.onClick(day.dayOfMonth))}}>
                {day.dayOfMonth} 
                </td>           
            ))}
        </tr> 

        )
}

export default CalanderRow;