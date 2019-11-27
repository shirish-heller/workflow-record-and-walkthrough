import React from 'react';
import { ListItem } from '../ListItem/ListItem';

export const TaskList = (props)=> {
    return (
            <div style={{marginTop: '20px'}}>
                {console.log("This is the tasklist component")}
                {console.log(props)}
            {
                props.tasks && props.tasks.length !== 0? props.tasks.map((task, index)=> {
                    return (
                        <ListItem key={task.taskId} item={task} handleTaskPlay={props.handleTaskPlay} handleDeleteTask={()=> props.handleDeleteTask(index)}/>
                    )
                }): <p style={{textAlign:'center',color:'grey'}}>Please create a new workflow</p>
            }
            </div>
    )
};