import React, { Component } from 'react';
import styles from './Drawer.module.css';
import {
    Button, Form
} from 'react-bootstrap';
import { TaskList } from '../TaskList/TaskList';

class Drawer extends Component {

    constructor(props) {
        super(props);
        this.taskNameRef = React.createRef();
    }

    render() {
        return (
            <div className={styles.DrawerContainer}>
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px', borderRadius: 10}}>
                    {/* Top Title Banner + Add Task Button */}
                    <div className={styles.TitleBanner}>
                        {/* Collapse Button */}
                        <div style={{display: 'flex', flex: 20}}>
                            <Button variant="light" className={styles.ButtonContainer} onClick={this.props.handleDrawerCollapse}>
                                <i className="fa fa-minus" style={{color: '#000'}}/>
                            </Button>
                        </div>
                        <div style={{display: 'flex', flex: 60, justifyContent: 'center'}}>
                            <h5 style={{display: 'flex', flex: 0.7, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16}}>
                                SELF-HELP
                            </h5>
                        </div>

                        <div style={{display: 'flex', flex: 20, justifyContent: 'flex-end'}}>
                        {
                            this.props.activeScreen === this.props.screens.LIST_OF_WORKFLOWS &&
                            <div className={styles.AddTaskButton}>
                                <Button variant="warning" className={styles.ButtonContainer} onClick={this.props.handleAddTask}>
                                    <i className="fa fa-plus" style={{color: '#fff'}}/>
                                </Button>
                            </div>
                        }
                        </div>

                    </div>
                    
                    {/* TaskList */}
                    {this.props.activeScreen === this.props.screens.LIST_OF_WORKFLOWS &&
                    <TaskList tasks={this.props.tasks} handleTaskPlay={this.props.handleTaskPlay} handleDeleteTask={this.props.handleDeleteTask}/>}
    
                    {/* Add Task */}
                    {
                            this.props.activeScreen === this.props.screens.CREATE_WORKFLOW &&
                            <div className={styles.AddStepContainer}>
                                      <Form.Group controlId="newTaskName">
                                        <Form.Label style={{textDecorationLine: 'underline', fontSize: 13}}>Workflow Name</Form.Label>
                                        <Form.Control as="textarea" ref={this.taskNameRef} rows="2" disabled={this.props.draftTask.taskName.trim()===""?false: true} value={this.props.draftTask.taskName.trim()===""?null:this.props.draftTask.taskName.trim()}/>
                                    </Form.Group>
                                <Form.Label style={{textDecorationLine: 'underline', fontSize: 13}}>Steps</Form.Label>
    
                                {
                                    this.props.draftTask.steps.map((step,index) => {
                                    return ( <div key={index} style={{display:'flex',flexDirection:'row', flex: 1, width: '70%', justifyContent: 'flex-start', paddingLeft:5, paddingRight: 5, paddingBottom: 2}}>
                                                <i className="fa fa-arrow-right" style={{paddingTop: 3, paddingRight: 4}}></i>
                                                <div style={{display:'flex',flex:85,color:'#007bff', textAlign: 'left'}}>{step.stepName}</div>
                                                <div style={{display:'flex',flex:15,color:'red',alignItems:'flex-end'}}>
                                                    <i className="fa fa-trash" style={{ marginLeft: 5, paddingBottom: 3, fontSize:'14px'}} onClick={()=>this.props.deleteStep(index)}></i>
                                                </div>
                                            </div>
                                    )
                                    })
                                }
                                <Button variant="light" className={styles.AddStepButton} size="sm" onClick={()=> this.props.onAddStepClick(this.taskNameRef)}>
                                    <i className="fa fa-plus" style={{fontSize:'13px', marginRight: 4}}></i>
                                    Add New Step
                                </Button>
                                <br/>
                                <div style={{alignItems: 'center', display:'flex',flex:1,justifyContent:'space-between'}}>
                                    <Button variant="light" size="sm" onClick={this.props.handleCancelClick}>
                                        <span style={{fontSize: 14, fontWeight: 'bold', color: '#4a90e2'}}>Cancel</span>
    
                                    </Button>
    
                                    <Button variant="light" style={{backgroundColor: '#4a90e2', marginLeft: 10}} size="sm" onClick={this.props.handleFinishTask}>
                                        <span style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>Finish</span>
                                    </Button>
                                 
                                </div>
                            </div>
                        }
                </div>
    
            </div>
        )
    }
} 
export default Drawer;