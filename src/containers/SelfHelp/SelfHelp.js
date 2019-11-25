import React, { Component } from 'react';
import styles from './SelfHelp.module.css';
import { Popup } from '../../components/Popup/Popup';
import {
    Button, Form
} from 'react-bootstrap';
import $ from 'jquery';
import Drawer from '../../components/Drawer/Drawer';

let lastElementHighlighted = null;
let lastElementHighlightedBGColor = null;
let lastRecordedXPath = null;
class SelfHelp extends Component {

    constructor(props) {
        super(props);
            this.state = {
                recordClickCapture: {
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    clientX: window.innerWidth/2,
                    clientY: window.innerHeight/2,
                    elementCaptured: null
                },
                guideClickCapture: {
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    clientX: window.innerWidth/2,
                    clientY: window.innerHeight/2,
                    elementCaptured: null
                },
                currentStep: null,
                currentTask: null,
                isGuideStepPopupOpen: false,
                isRecordStepPopupOpen: false,
                isGuideActive: false,
                drawer: {
                    showDrawer: false,
                    showTextArea:false
                },
                record: {
                    isRecording: false,
                },
                draftTask: {
                    taskId: null,
                    taskName: "",
                    taskRootUrl: null,
                    steps: []
                },
                tasks: [],
                hover: {
                    hoverAddTaskButton: false,
                    hoverStartButton:false,
                    hoverCloseButton: false
                },
                screens: {
                    LIST_OF_WORKFLOWS:"LIST_OF_WORKFLOWS",
                    DESCRIPTION_OF_WORKFLOW:"DESCRIPTION_OF_WORKFLOW",
                    CREATE_WORKFLOW:"CREATE_WORKFLOW"
                },
                activeScreen: "LIST_OF_WORKFLOWS",
                inspectModeOn:false,
                draftStep:{
                    stepName:'',
                    xPath:''
                }
            };
        this.stepNameRef = React.createRef();
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        let nextCurrentTask = nextState.currentTask;
        let nextCurrentStep = nextState.currentStep;

        if(nextState.isGuideActive) {
            if(nextCurrentTask === this.state.currentTask  && nextCurrentStep === this.state.currentStep) {

            }else {
                this.handleStepChange(nextState.currentTask, nextState.currentStep);
            }
        }
    }

    handleStepChange = (taskIndex = 0, stepIndex = 0)=> {
        let currentTask = taskIndex;
        let currentStep = stepIndex;
        if(this.state.guideClickCapture.elementCaptured) {
            this.state.guideClickCapture.elementCaptured.style.setProperty('box-shadow', 'none');
        }
        let element = this.getElementByXpath(this.state.tasks[currentTask].steps[currentStep].xPath);
        element.style.boxShadow = "0 0 0 1px " + this.props.highlightColor + ", 0 0 0 8px " + this.props.highlightColor;
        let elementBoundingRect = element.getBoundingClientRect();
        let elementBottomLimit = elementBoundingRect.bottom;
        let elementLeftLimit = elementBoundingRect.left;
        let elementTopLimit = elementBoundingRect.top;
        // New changes
        let xCoordinateOfPopUp = elementLeftLimit + 20;
        let yCoordinateOfPopUp = elementBottomLimit + 20;

        // As MaxHeightOfPopU=150
        if(yCoordinateOfPopUp+150>this.state.recordClickCapture.screenHeight)
            yCoordinateOfPopUp = elementTopLimit-20-150;
        // As MaxWidthofPopUp=300
        if(xCoordinateOfPopUp+300>this.state.recordClickCapture.screenWidth){
            var diff = (xCoordinateOfPopUp+300)-this.state.recordClickCapture.screenWidth
            xCoordinateOfPopUp = xCoordinateOfPopUp-diff-20;
        }

        this.setState({
            guideClickCapture: {
                clientX: xCoordinateOfPopUp,
                clientY: yCoordinateOfPopUp,
                screenWidth: this.state.guideClickCapture.screenWidth,
                screenHeight: this.state.guideClickCapture.screenHeight,
                elementCaptured: element
            },
            isGuideStepPopupOpen: true,
            isGuideActive: true,
            drawer: {
                ...this.state.drawer,
                showDrawer: false
            }
          });
    }

    onAddStepClick = (taskNameRef)=> {

        if(this.state.draftTask.taskName.trim() !== "") {
            this.startInspectMode();
        } else if(taskNameRef.current && taskNameRef.current.value !== "") {
                if(this.state.draftTask.taskName.trim() === "") {
                    this.setState({
                        draftTask: {
                            ...this.state.draftTask,
                            taskName: taskNameRef.current.value
                        }
                    });
                }
                this.startInspectMode();
        } else {
                alert("Workflow name is empty");
        }
    };

    getElementByXpath = (path)=> {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };

    handleDrawerCollapse = () => {
        this.setState({
            ...this.state,
            drawer: {
                ...this.state.drawer,
                showDrawer: false
            }
        });
    };

    handleSelfHelpClick = () => {
        this.setState({
            ...this.state,
            drawer: {
                ...this.state.drawer,
                showDrawer: true
            }
        });
    };

    handleTaskPlay = (taskId, e)=> {
        for(let i=0; i< this.state.tasks.length; i++) {
            if(this.state.tasks[i].taskId === taskId) {
                this.setState({
                    currentStep: 0,
                    currentTask: i,
                    isGuideActive: true
                });
                break;
            }
        }
    };

    handleNextStepPress = ()=> {
        this.state.guideClickCapture.elementCaptured.click();
        setTimeout(()=> {
            this.setState({
                    currentTask: this.state.currentTask,
                    currentStep: this.state.currentStep+1
            });
        }, 200);
    };

    stopGuide = ()=> {
        if(this.state.guideClickCapture.elementCaptured !== null) {
            this.state.guideClickCapture.elementCaptured.style.setProperty('box-shadow', 'none');
        }
        this.setState({
                guideClickCapture: {
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    clientX: window.innerWidth/2,
                    clientY: window.innerHeight/2,
                    elementCaptured: null
                },
                currentStep: null,
                currentTask: null,
                isGuideActive: false,
                isGuideStepPopupOpen: false,
          });
        
    };

    getStepMessage = ()=> {
        let currentTask = this.state.currentTask;
        let currentStep = this.state.currentStep;
        let message = currentTask!=null?this.state.tasks[currentTask].steps[currentStep].stepName: "";
        return message;
    };

    guidGenerator = ()=> {
        let S4 = ()=>  (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    getXPath = (elm)=> {   
        console.log(elm);
        if(lastElementHighlighted != null || lastElementHighlightedBGColor != null){
            lastElementHighlighted.style.backgroundColor = lastElementHighlightedBGColor;
        }
        let element = elm.srcElement;
        let xpath = '';
        for ( ; element && element.nodeType === 1; element = element.parentNode )
        {
            //alert(element);
            let id = $(element.parentNode).children(element.tagName).index(element) + 1;
            // let id = 22;
            id > 1 ? (id = '[' + id + ']') : (id = '');
            xpath = '/' + element.tagName.toLowerCase() + id + xpath;
        }
        console.log(xpath);
         //highlight the element
         let elementToBeHighlighted = this.getElementByXpath(xpath);
         lastRecordedXPath = xpath;
         lastElementHighlighted = elementToBeHighlighted;
         lastElementHighlightedBGColor = elementToBeHighlighted.style.backgroundColor;
         elementToBeHighlighted.style.backgroundColor = this.props.inspectorColor;  
    };

    startInspectMode=()=>{
        console.info("InspectMode ON")
        document.addEventListener('mouseover', this.getXPath);
        document.addEventListener('click', this.handleInspectorSelectedElement, true);
        document.documentElement.style.cursor = 'crosshair';
        this.setState({
            inspectModeOn:true,
            drawer: {
                ...this.state.drawer,
                showDrawer: false
            }
        });
    };
    
    stopInspectMode=()=>{
        console.info("InspectMode OFF");
        document.removeEventListener('mouseover', this.getXPath);
        document.removeEventListener('click', this.handleInspectorSelectedElement, true);
        document.documentElement.style.cursor = 'default';
        this.setState({
            inspectModeOn:false
        });
    };

    handleInspectorSelectedElement=(e)=>{
        this.stopInspectMode();
        e.stopPropagation();
        let element = this.getElementByXpath(lastRecordedXPath);
        if(this.state.recordClickCapture.elementCaptured) {
            this.state.recordClickCapture.elementCaptured.style.setProperty('box-shadow', 'none');
        }
        element.style.boxShadow = "0 0 0 1px " + this.props.highlightColor + ", 0 0 0 8px " + this.props.highlightColor;
        let elementBoundingRect = element.getBoundingClientRect();
        let elementBottomLimit = elementBoundingRect.bottom;
        let elementLeftLimit = elementBoundingRect.left; 
        let elementTopLimit = elementBoundingRect.top;
        // New changes
        let xCoordinateOfPopUp = elementLeftLimit + 20;
        let yCoordinateOfPopUp = elementBottomLimit + 20;
        // As MaxHeightOfPopU=150
        if(yCoordinateOfPopUp+150>this.state.recordClickCapture.screenHeight)
            yCoordinateOfPopUp = elementTopLimit-20-150;
        // As MaxWidthofPopUp=300
        if(xCoordinateOfPopUp+300>this.state.recordClickCapture.screenWidth){
            var diff = (xCoordinateOfPopUp+300)-this.state.recordClickCapture.screenWidth
            xCoordinateOfPopUp = xCoordinateOfPopUp-diff-20;
        }
        this.setState({
            recordClickCapture: {
                clientX: xCoordinateOfPopUp,
                clientY: yCoordinateOfPopUp,
                screenWidth: this.state.recordClickCapture.screenWidth,
                screenHeight: this.state.recordClickCapture.screenHeight,
                elementCaptured: element
            },
            isGuideStepPopupOpen: false,
            isRecordStepPopupOpen: true,
            isGuideActive: true,
            drawer: {
                ...this.state.drawer,
                showDrawer: false
            },
            draftStep:{
                ...this.state.draftStep,
                xPath:lastRecordedXPath
            }
          });
    };

    handleAddTask = ()=> {
        let tempDraftTask = this.state.draftTask;
        tempDraftTask['taskId'] = this.guidGenerator();
        tempDraftTask['taskRootUrl'] = window.location.href;
        this.setState({
            activeScreen:this.state.screens.CREATE_WORKFLOW,
            draftTask: tempDraftTask
        });
    };

    handleAddStep = ()=> {
        if(this.stepNameRef.current.value.length !==0) {
            let draftStep = {
                stepName: this.stepNameRef.current.value,
                xPath: lastRecordedXPath
            }
            // open the right fixed panel
            // populate the steps 
            this.state.recordClickCapture.elementCaptured.style.setProperty("box-shadow", "none");
            if(lastElementHighlighted != null || lastElementHighlightedBGColor != null){
                lastElementHighlighted.style.backgroundColor = lastElementHighlightedBGColor;
            }
            this.setState({
                isRecordStepPopupOpen: false,
                drawer: {
                    ...this.state.drawer,
                    showDrawer: true
                },
                draftTask:{
                    ...this.state.draftTask,
                    steps: [...this.state.draftTask.steps, draftStep]
                },
                draftStep:{
                    stepName:'',
                    xPath:''
                },
            }, ()=> {
                console.log(this.state.draftTask);
            })
            let element = this.getElementByXpath(lastRecordedXPath);
            element.click();
        } else {
            window.confirm("Please fill step description");
        }
    };

    handleCancelClick = ()=> {
        this.setState({
            activeScreen: this.state.screens.LIST_OF_WORKFLOWS,
            draftTask: {
                taskId: null,
                taskName: "",
                taskRootUrl: null,
                steps: []
            },
        })
    }

    deleteStep = (index)=> {
        console.log("step-" + index + " will be deleted")
        let tempSteps = this.state.draftTask.steps;
        tempSteps.splice(index,1);
        this.setState({
            draftTask:{
                ...this.state.draftTask,
                steps:tempSteps
            }
        });
    }

    handleDeleteTask = (index)=> {
        console.log("Task-" + index + " will be deleted")
        let tempTasks = this.state.tasks;
        tempTasks.splice(index,1);
        this.setState({
            tasks: tempTasks
        });
    }

    handleFinishTask = ()=> {
        //store it in tasks array
        if(this.state.draftTask.taskName === ""){
            alert("Workflow name must be entered");
        }else if(this.state.draftTask.steps.length === 0){
            alert("Atleast one step is required to create a workflow");
        }else{
            var tempTasks = [...this.state.tasks];
            tempTasks.push(this.state.draftTask);
            this.setState({ 
                activeScreen : this.state.screens.LIST_OF_WORKFLOWS,
                tasks: tempTasks,
                draftTask:{
                    taskId: null,
                    taskName: "",
                    taskRootUrl: null,
                    steps: []
                }
            });
        }
    };

    render() {
        return (
            <div className={styles.container}>
                
                {/* Drawer and SelfHelp widget */}
                {!this.state.drawer.showDrawer? 
                <div className={styles.widget} style={{backgroundColor: this.props.themeColor}} onClick={this.handleSelfHelpClick}>
                    <div className={styles.widgetTextContainer}>SELF-HELP</div>
                </div>
                 : 
                 <Drawer activeScreen={this.state.activeScreen} tasks={this.state.tasks} handleTaskPlay={this.handleTaskPlay}
                 handleDrawerCollapse={this.handleDrawerCollapse} screens={this.state.screens} handleAddTask={this.handleAddTask}
                 draftTask={this.state.draftTask} draftStep={this.state.draftStep} startInspectMode={this.startInspectMode} 
                 handleFinishTask={this.handleFinishTask} onAddStepClick={this.onAddStepClick} handleCancelClick={this.handleCancelClick} 
                 deleteStep={this.deleteStep} handleDeleteTask={this.handleDeleteTask}></Drawer>
                }

                {/* Guide-Popup */}
                {
                this.state.isGuideStepPopupOpen && 
                <Popup clickCapture={this.state.guideClickCapture}>
                    <span style={{fontSize: 15}}>{this.getStepMessage()}</span>
                    <div className={styles.PopupButtonContainer}>
                    {/* SKIP Button */}
                        <Button variant="link" className={styles.ButtonContainer}
                            style={{color: '#fff', minWidth: 70, fontWeight: 'bold', fontSize: 14, textDecoration: 'underline', outline: 'none'}} onClick={this.stopGuide}>
                            Skip
                        </Button>

                        {this.state.currentStep!==null && this.state.currentStep === (this.state.tasks[this.state.currentTask].steps.length)-1?
                    // FINISH Button
                        <Button variant="light" className={styles.ButtonContainer}
                            style={{color: this.props.themeColor, minWidth: 70, fontWeight: 'bold', fontSize: 14, outline: 'none'}} onClick={this.stopGuide}>
                            Finish
                            <i className="fa fa-check-circle" style={{color: this.state.theme, marginLeft: 3, fontSize: 16}}/>
                        </Button>    
                        :
                    // NEXT Button
                        <Button
                            variant="light" className={styles.ButtonContainer}
                            style={{color: this.props.themeColor, minWidth: 70, fontWeight: 'bold', fontSize: 14, outline: 'none'}} onClick={this.handleNextStepPress}>
                            Next   
                            <i className="fa fa-angle-right" style={{color: this.state.theme, marginLeft: 4, fontSize: 16}}/>
                        </Button>
                    }
                    </div>
                </Popup>
                }

                {/* Record Step popover */}
                {
                    this.state.isRecordStepPopupOpen &&
                <Popup clickCapture={this.state.recordClickCapture}>
                    <Form.Group controlId="newTaskName">
                        <Form.Label style={{textDecorationLine: 'underline', fontSize: 15, fontWeight: 'bold'}}>Step Description</Form.Label>
                        <Form.Control as="textarea" ref={this.stepNameRef} rows="2"/>
                    </Form.Group>
                    <Button variant="light" style={{backgroundColor: '#4a90e2'}} size="sm" onClick={this.handleAddStep}>
                        <i className="fa fa-plus" style={{fontSize:'13px', marginRight: 4}}></i>
                        <span style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>ADD STEP</span>
                    </Button>
                </Popup>
                }
            </div>
        )
    }
}
export default SelfHelp;