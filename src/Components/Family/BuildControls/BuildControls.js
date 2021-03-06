import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import Car from '../../../assets/icons/modeIcons/Car.png'
import Cycle from '../../../assets/icons/modeIcons/Bicycle.png'
import MotorCycle from '../../../assets/icons/modeIcons/Motorcycle.png'
import family from '../../../assets/icons/family.png'
const buildControls=props=>{
    const controls=[
        {label:'Number of members in the family',type:'noOfMembers',value:props.family.noOfMembers,src:family},
        {label:'Number of cars',type:'noOfCars',value:props.family.noOfCars,src:Car},
        {label:'Number of scooters/motorcycles',type:'noOfTwoWheelers',value:props.family.noOfTwoWheelers,src:MotorCycle},
        {label:'Number of cycles',type:'noOfCycles',value:props.family.noOfCycles,src:Cycle},
    ]
        
    return(<div className={classes.BuildControls}>
            {controls.map(element=>{
                return(
                <BuildControl value={element.value} added={()=>props.valueAdded(element.type)} src={element.src} removed={()=>props.valueRemoved(element.type)} key={element.label} label={element.label}></BuildControl>)
                
            })}
        </div>)
    
}

export default buildControls