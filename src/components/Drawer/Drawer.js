import React from 'react';
import styles from './Drawer.module.css';
import {
    Button
} from 'react-bootstrap';
import { ListItem } from '../ListItem/ListItem';

const screens={
    LIST_OF_WORKFLOWS:"LIST_OF_WORKFLOWS",
    DESCRIPTION_OF_WORKFLOW:"DESCRIPTION_OF_WORKFLOW",
    CREATE_WORKFLOW:"CREATE_WORKFLOW"
};

export const Drawer = (props) => {
    return (
        <div className={styles.DrawerContainer}>
            <div style={{display: 'flex', flexDirection: 'column', padding:'5px', borderRadius: 10}}>
                {/* Top Title Banne + Add Task Button */}
                <div className={styles.TitleBanner}>
                    {/* Collapse Button */}
                    <Button
                            variant="light"
                            className={styles.ButtonContainer}
                            bsStyle="link" bsSize="xsmall"
                            onClick={props.handleDrawerCollapse}>
                            <i className="fa fa-minus" style={{color: '#000'}}/>
                        </Button>

                    <h5 style={{display: 'flex', flex: 0.7, alignItems: 'center', justifyContent: 'center'}}>
                        SELF-HELP
                    </h5>
                    {
                        props.activeScreen === screens.LIST_OF_WORKFLOWS &&
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #85bf31', borderRadius: 15, backgroundColor: '#85bf31',height:25,width:25}}>
                        <Button
                            variant="warning"
                            className={styles.ButtonContainer}
                            onClick={{}}>
                            <i className="fa fa-plus" style={{color: '#fff'}} onClick={()=>{
                                let tempDraftTask = this.state.draftTask;
                                tempDraftTask['taskId'] = this.guidGenerator();
                                tempDraftTask['taskRootUrl'] = window.location.href;
                                this.setState({
                                    activeScreen:screens.CREATE_WORKFLOW,
                                    draftTask: tempDraftTask
                                })
                            }}/>
                        </Button>

                        </div>
                    }
                </div>

                {/* Task List */}
                {
                    props.activeScreen === screens.LIST_OF_WORKFLOWS &&
                    <div style={{marginTop: '12px'}}>
                    {
                        props.tasks.map(task=> {
                            return (
                                <ListItem key={task.taskId} item={task} handleTaskPlay={props.handleTaskPlay}/>
                            )
                        })
                    }{
                        props.tasks.length === 0 &&
                        <p style={{textAlign:'center',color:'grey'}}>Please create a new workflow.</p>

                    }
                    </div>
                }

            </div>

        </div>
    )
} 