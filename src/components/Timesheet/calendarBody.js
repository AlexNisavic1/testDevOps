
import CalanderRow from "./calenderRow";

function CalendarBody (props){   

    
        let rowsInTable= Math.floor(props.days.length / 7);
        let additionalRow;
        let allRows=[];
        if ((props.days.lenght % rowsInTable)!==0) {
            additionalRow=1;
        };

        let start=0;

        for( start; start < (rowsInTable*7); start+=7){
            let row;
            row=[];
            row=props.days.slice(start, (start+7));
            allRows.push(row);
        }

        if(additionalRow===1){
            let  row1=props.days.slice(((7*rowsInTable)), props.days.length);
            allRows.push(row1);
        }

     


    return (  
        <tbody>
           {allRows.map((row)=>
           <CalanderRow row={row} key={row.index} onClick={props.onClick}/>
           )}
       </tbody>
  )
}

export default CalendarBody;