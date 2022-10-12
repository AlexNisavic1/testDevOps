import classes from './dayInTimesheet.module.css'


function DayInTimesheet (props){
    return (
        <div className={classes.container} >
            <table>
                <thead>
                    <th>Client *</th>
                    <th>Project *</th>
                    <th>Category *</th>
                    <th>Description *</th>
                    <th>Time *</th>
                    <th>Overtime </th>
                </thead>
            </table>
        </div>
    )
}

export default DayInTimesheet;