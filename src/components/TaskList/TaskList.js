import React from 'react';
import { ListItem } from '../ListItem/ListItem';

export const TaskList = (props)=> {
    return (
            <div style={{marginTop: '12px'}}>
            {
                props.tasks.length !== 0 && props.tasks.map((task, index)=> {
                    return (
                        <ListItem key={task.taskId} item={task} handleTaskPlay={props.handleTaskPlay} handleDeleteTask={()=> props.handleDeleteTask(index)}/>
                    )
                })
            }{
                props.tasks.length === 0 &&
                <p style={{textAlign:'center',color:'grey'}}>Please create a new workflow.</p>

            }
            </div>
    )
};