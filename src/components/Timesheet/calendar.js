
import classes from './calendar.module.css'
import CalendarBody from './calendarBody';

function Calendar (props){

    const allDays = [];

        let daysInCurrentMonth=new Date(props.year, props.month,0).getDate();
        let  daysInLastMonth = new Date(props.year, props.month-1,0).getDate();
        let  firstDayInMonth=new Date(props.year,props.month-1,1);
        let  firstDayInAWeek= firstDayInMonth.getDay();
    
            for(let i = daysInLastMonth-firstDayInAWeek+1; i <=daysInLastMonth;i++){
                allDays.push({dayOfMonth:i,
                            isNotCurrentMonth:true})
            }
    
            for(let i = 1; i <=daysInCurrentMonth;i++){
                allDays.push({dayOfMonth:i,
                            isNotCurrentMonth:false})
            }
 
    
    return (
     <div className={classes.container}>
        
         <table className={classes.calendarTable}>
         <thead>
             <tr>
                   <th>Sunday</th>
                   <th>Monday</th>
                   <th>Tuesday</th>
                   <th>Wednesday</th>
                   <th>Thursday</th>
                   <th>Friday</th>
                   <th>Saturday</th>             
            </tr>
         </thead>
            <CalendarBody days={allDays} onClick={props.onClick}/> 
           
         </table> 

     </div>
    )
}

export default Calendar;