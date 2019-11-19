import React, { Component } from 'react';
import styles from './SelfHelp.module.css';
import { Drawer } from '../../components/Drawer/Drawer';
import { Popup } from '../../components/Popup/Popup';
import {
    Button
} from 'react-bootstrap';

const screens={
    LIST_OF_WORKFLOWS:"LIST_OF_WORKFLOWS",
    DESCRIPTION_OF_WORKFLOW:"DESCRIPTION_OF_WORKFLOW",
    CREATE_WORKFLOW:"CREATE_WORKFLOW"
};

class SelfHelp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            activeScreen:screens.LIST_OF_WORKFLOWS,
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
            tasks: [
                {
                    taskId: "task_1",
                    taskName: "How to add a new configuration key lksdjf sdkfh dsflih sdfij sdif lsdnfhukuhsdkbsdufh sdofuh osdfh dh ljdfn sdflij fijsdf ijd",
                    taskRootUrl: "https://dash-e2e.intuit.com/#/widget/CTO-FDS/ProviderConfigurations@1.82.4",
                    steps: [
                        {
                            stepName: "Click on \"Add Configuration Key\" button",
                            xPath: "/html/body/div/div/div[1]"
                            // xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Add configuration key details in this form",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div/div/div[2]"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        }
                    ]
                },
                {
                    taskId: "task_2",
                    taskName: "How to add a bank transaction",
                    taskRootUrl: "https://dash-e2e.intuit.com/#/widget/CTO-FDS/ProviderConfigurations@1.82.4",
                    steps: [
                        {
                            stepName: "Click on \"Add Configuration Key\" button",
                            xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Add configuration key details in this form",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Click on \"Save\" to create the new configuration key",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div/div[3]/button[2]"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        }
                    ]
                },
                {
                    taskId: "task_3",
                    taskName: "How to see all your bank accounts",
                    taskRootUrl: "https://dash-e2e.intuit.com/#/widget/CTO-FDS/ProviderConfigurations@1.82.4",
                    steps: [
                        {
                            stepName: "Click on \"Add Configuration Key\" button",
                            xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Add configuration key details in this form",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Click on \"Save\" to create the new configuration key",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div/div[3]/button[2]"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        }
                    ]
                },
                {
                    taskId: "task_4",
                    taskName: "How to delink a bank from your account",
                    taskRootUrl: "https://dash-e2e.intuit.com/#/widget/CTO-FDS/ProviderConfigurations@1.82.4",
                    steps: [
                        {
                            stepName: "Click on \"Add Configuration Key\" button",
                            xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Add configuration key details in this form",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        },
                        {
                            stepName: "Click on \"Save\" to create the new configuration key",
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                            xPath: "/html/body/div[2]/div/div/div/div[3]/button[2]"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[1]/div/div/div[1]/div[2]/div/div/button"
                            // xPath: "/html/body/div[1]/div/div/div[2]/div[2]/div/div[2]"
                        }
                    ]
                }
            ],
            hover: {
                hoverAddTaskButton: false,
                hoverStartButton:false,
                hoverCloseButton: false
            },
            inspectModeOn:false,
            draftStep:{
                stepName:'',
                xPath:''
            }

        };
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate called");
        // debugger;
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
        let elementRightLimit = elementBoundingRect.right;
        let elementTopLimit = elementBoundingRect.top;

        // document.getRootNode().body.style.opacity = 0.1;
        // element.style.setProperty('opacity', 1, 'important');
        // element.style.setProperty('z-index', 9999, 'important');
        // document.addEventListener("click", this.eventFunc, true);

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

    getElementByXpath = (path)=> {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    handleDrawerCollapse = () => {
        this.setState({
            ...this.state,
            drawer: {
                ...this.state.drawer,
                showDrawer: false
            }
        })
    }

    handleSelfHelpClick = () => {
        this.setState({
            ...this.state,
            drawer: {
                ...this.state.drawer,
                showDrawer: true
            }
        });
    }

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
    }

    handleNextStepPress = ()=> {
        this.state.guideClickCapture.elementCaptured.click();
        setTimeout(()=> {
            this.setState({
                    currentTask: this.state.currentTask,
                    currentStep: this.state.currentStep+1
            });
        }, 200);
    }

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
        
    }

    getStepMessage = ()=> {
        let currentTask = this.state.currentTask;
        let currentStep = this.state.currentStep;
        let message = currentTask!=null?this.state.tasks[currentTask].steps[currentStep].stepName: "";
        return message;
    }

    render() {
        return (
            <div className={styles.container}>
                
                {/* Drawer and SelfHelp widget */}
                {!this.state.drawer.showDrawer? 
                <div className={styles.widget} style={{backgroundColor: this.props.themeColor}} onClick={this.handleSelfHelpClick}>
                    <div className={styles.widgetTextContainer}>SELF-HELP</div>
                </div>
                 : 
                 <Drawer activeScreen="LIST_OF_WORKFLOWS" tasks={this.state.tasks} handleTaskPlay={this.handleTaskPlay}
                 handleDrawerCollapse={this.handleDrawerCollapse}></Drawer>
                }

                
                {/* Guide-Popup */}
                <Popup isGuideStepPopupOpen={this.state.isGuideStepPopupOpen} guideClickCapture={this.state.guideClickCapture}>
                    {this.getStepMessage()}

                    <div className={styles.PopupButtonContainer}>
                    {/* SKIP Button */}
                        {/* <div style={{backgroundColor: '#fff', color: 'hsl(52, 80%, 50%)', width: '45%', display: 'flex', justifyContent: 'center'}} onClick={this.stopGuide}>SKIP</div>  */}

                        <Button
                            variant="light"
                            className={styles.ButtonContainer}
                            style={{color: this.props.themeColor, minWidth: 70, fontWeight: 'bold', fontSize: 16}}
                            onClick={{}}>
                            SKIP
                            <i className="fa fa-stop-circle" style={{color: this.props.themeColor, marginLeft: 3, fontSize: 16}}/>

                        </Button>

                        {this.state.currentStep && this.state.currentStep === this.state.tasks[this.state.currentTask].steps.length-1?
                    // FINISH Button
                        // <div style={{backgroundColor: '#fff', color: 'hsl(52, 80%, 50%)', width: '45%', display: 'flex', justifyContent: 'center'}} onClick={this.stopGuide}>FINISH</div> 
                        <Button
                        variant="light"
                        className={styles.ButtonContainer}
                        style={{color: this.props.themeColor, minWidth: 70, fontWeight: 'bold'}}
                        onClick={{}}>
                        FINISH
                    </Button>    
                        :
                    // NEXT Button
                        // <div style={{backgroundColor: '#fff', color: 'hsl(52, 80%, 50%)', width: '45%', display: 'flex', justifyContent: 'center'}} onClick={this.handleNextStepPress}>NEXT</div>
                        <Button
                        id="next"
                        variant="light"
                        className={styles.ButtonContainer}
                        style={{color: this.props.themeColor, minWidth: 70, fontWeight: 'bold'}}
                        onClick={this.handleNextStepPress}>
                        NEXT   
                        <i className="fa fa-angle-right" style={{color: this.state.theme, marginLeft: 3, fontSize: 16}}/>
                    </Button>
                    }
                    </div>
                </Popup>
            </div>
        )
    }

}

export default SelfHelp;