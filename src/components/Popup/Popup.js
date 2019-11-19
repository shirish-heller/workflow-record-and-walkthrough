import React from 'react';
import styles from './Popup.module.css';

export const Popup = (props)=> {
    return (
        <div className={styles.Container} style={{
            display: props.isGuideStepPopupOpen? 'flex': 'none',
            left: props.guideClickCapture.clientX,
            top:  props.guideClickCapture.clientY


            }}>
            {props.children}
        </div>
    )
};