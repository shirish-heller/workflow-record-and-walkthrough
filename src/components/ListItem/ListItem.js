import React from 'react';
import styles from './ListItem.module.css';
import {
    Button
} from 'react-bootstrap';

// import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export const ListItem = (props)=> {


    return (
        <div className={styles.container}>
            <div className={styles.TaskNameContainer}>
                {/* <Glyphicon style={{paddingTop: 2, marginRight: 5}} glyph="arrow-right"/> */}
                <i className="fa fa-arrow-right" style={{paddingTop: 3, paddingRight: 4}}></i>
                <span style={{textAlign: 'left'}}>{props.item.taskName}</span>
            </div>

            {/* Actions Container */}
            <div id="action-container" className={styles.actionsContainer}>
            {/* <i class="fa fa-camera-retro"></i> */}
                {/* <Glyphicon className={styles.Play} glyph="play" onClick={props.handleTaskPlay.bind(this, props.item.taskId)}/> */}
                {/* <Glyphicon className={styles.Delete} glyph="trash"/> */}
                <Button
                    variant="success"
                    className={styles.ButtonContainer}
                    style={{marginRight: 3}}
                    size="sm"
                //    onClick={props.handleTaskPlay.bind(this, props.item.taskId)}>
                      onClick={()=> props.handleTaskPlay(props.item.taskId)}> 
                    {/* <Glyphicon glyph="trash"/> Remove */}
                    <i className="fa fa-play" style={{fontSize:'12px'}}></i>
                    </Button>
                <Button
                    variant="danger"
                    className={styles.ButtonContainer}
                    size="sm">
                {/* //    onClick={props.handleTaskPlay.bind(this, props.item.taskId)}>
                    // onClick={(props)=> props.handleTaskPlay(props.item.taskId)}> */}
                    {/* <Glyphicon glyph="trash"/> Remove */}
                    <i className="fa fa-trash" style={{fontSize:'13px'}}></i>

                </Button>
            </div>

            <hr/>
        </div>
    )
}