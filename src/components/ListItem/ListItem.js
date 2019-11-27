import React from 'react';
import styles from './ListItem.module.css';

export const ListItem = (props)=> {
        console.log("List Item Component")
    return (
        <div className={styles.container}>
            {console.log("List Item props")}
            {console.log(props)}
            {/* Task Name */}
            <div className={styles.TaskNameContainer}>
                <span style={{marginRight: 5, fontSize: 15, fontWeight: 'bold', marginBottom: 1}}>&#x2192;</span>
                <span style={{textAlign: 'left'}}>{props.item.taskName}</span>
            </div>

            {/* Actions Container */}
            <div id="action-container" className={styles.actionsContainer}>
                    <span className={styles.Icon} style={{color: '#85bf31', marginRight: 8}} onClick={()=> props.handleTaskPlay(props.item.taskId)}>&#9658;</span>

                    <span className={styles.Icon} style={{color: '#DB524B'}} onClick={props.handleDeleteTask}>&#10006;</span>
            </div>
            <hr/>
            {console.log("List Item props")}
            {console.log(props)}
        </div>
    )
}