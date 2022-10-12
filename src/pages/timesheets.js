import { useState } from "react";
import Calendar from '../components/Timesheet/calendar';
import React from "react";
import '../components/ui/shared.css';
import DayInTimesheet from '../components/Timesheet/dayInTimesheet';

function Timehseet(){
    let currentDate=new Date();
    const [month,setMonth]=useState(currentDate.getMonth()+1); 
    const [year, setYear]=useState(currentDate.getFullYear());
    const [dateSelected, setDateSelected] = useState(false);

    function PreviousMonth(){
        var currentMonth=month;
        if ((currentMonth-1) === 0){
            setYear(year-1);
            setMonth(12);
        }
        else{
            setMonth(month-1)
        }

        setDateSelected(false);
    }

    function nextMonth (){
        var currentMonth=month;
        if ((currentMonth+1) === 13){
            setYear(year+1);
            setMonth(1);
        }
        else{
            setMonth(month+1)
        }
        setDateSelected(false);
    }

    function SelectDate(day){
        setDateSelected(!dateSelected);
    }

    return (
        <div>
        <div className="headerTimesheet">
            <div className="previousMonth" onClick={()=>{PreviousMonth()}}>  previous month </div>
            <div className="currentDate"> {year} {month}</div>
            <div className="nextMonth" onClick={()=>{nextMonth()}}> next month</div>
        </div>
        {dateSelected ? <DayInTimesheet/> :
        <Calendar year={year} month={month} onClick={SelectDate}/>}
       
    </div>)
}

export default Timehseet;