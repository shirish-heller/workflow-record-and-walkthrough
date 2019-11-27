import React, { Component } from 'react';
import styles from './Drawer.module.css';
import Button from '../Button/Button';
import { TaskList } from '../TaskList/TaskList';
import { bold } from 'ansi-colors';

class Drawer extends Component {

    constructor(props) {
        super(props);
        this.taskNameRef = React.createRef();
        console.log("Drawer constructor");
    }

    componentDidUpdate() {
        if(this.taskNameRef && this.taskNameRef.current) {
            this.taskNameRef.current.focus();
        }
    }

    render() {
        return (
            <div className={styles.DrawerContainer}>
                {console.log(this.props)}
                <div style={{display: 'flex', flexDirection: 'column', padding:'5px', borderRadius: 10}}>
                    {/* Top Title Banner + Add Task Button */}
                    <div className={styles.TitleBanner}>
                        {/* Collapse Button */}
                        <div style={{display: 'flex', flex: 20}}>
                            <Button variant="light" className={styles.ButtonContainer} style={{backgroundColor: '#fff', borderRadius: '50px', height: '38px', width: '38px'}} onClick={this.props.handleDrawerCollapse}>
                                <span style={{fontSize: 22, color: '#000', fontWeight: 'bold'}}>&#x2212;</span>
                            </Button>
                        </div>
                        <div style={{display: 'flex', flex: 60, justifyContent: 'center'}}>
                            <h5 style={{display: 'flex', flex: 0.7, alignItems: 'center', margin: 0, justifyContent: 'center', fontWeight: 'bold', fontSize: 16}}>
                                SELF-HELP
                            </h5>
                        </div>

                        <div style={{display: 'flex', flex: 20, justifyContent: 'flex-end'}}>
                        {
                            this.props.activeScreen === this.props.screens.LIST_OF_WORKFLOWS &&
                            <div className={styles.AddTaskButton}>
                                <Button className={styles.ButtonContainer} style={{borderRadius: '50px', backgroundColor: '#FFC45E', height: '35px', width: '35px'}} onClick={this.props.handleAddTask}>
                                    <span style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>&#x2b;</span>
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
                                        <span style={{textDecorationLine: 'underline', fontSize: 13, paddingBottom: 5}}>Workflow Name</span>
                                        <textarea style={{marginBottom: 10}} ref={this.taskNameRef} rows="2" disabled={this.props.draftTask.taskName.trim()===""?false: true} value={this.props.draftTask.taskName.trim()===""?null:this.props.draftTask.taskName.trim()}/>
                                <span style={{textDecorationLine: 'underline', fontSize: 13, marginBottom: 5}}>Steps</span>
                                {
                                    this.props.draftTask.steps.map((step,index) => {
                                    return ( <div key={index} style={{display:'flex',flexDirection:'row', flex: 1, width: '70%', justifyContent: 'flex-start', paddingLeft:5, paddingRight: 5, paddingBottom: 5}}>
                                                {/* <i className="fa fa-arrow-right" style={{paddingTop: 3, paddingRight: 4}}></i> */}
                                                <span style={{marginRight: 5, fontSize: 15, fontWeight: 'bold'}}>&#x2192;</span>

                                                <div style={{display:'flex',flex:85,color:'#007bff', textAlign: 'left', fontSize: 13}}>{step.stepName}</div>
                                                <div style={{display:'flex',flex:15,color:'red',alignItems:'flex-end'}}>
                                                    {/* <i className="fa fa-trash" style={{ marginLeft: 5, paddingBottom: 3, fontSize:'14px'}} onClick={()=>this.props.deleteStep(index)}></i> */}
                                                    <span className={styles.Icon} style={{color: '#DB524B'}} onClick={()=>this.props.deleteStep(index)}>&#10006;</span>

                                                </div>
                                            </div>
                                    )
                                    })
                                }
                                <button variant="light" className={styles.AddStepButton} onClick={()=> this.props.onAddStepClick(this.taskNameRef)}>
                                    <span style={{fontWeight: 'bold', fontSize: 15, marginRight: 3, paddingBottom: 2}}>+</span>
                                    <span style={{fontSize: 12}}>Add New Step</span>
                                </button>
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