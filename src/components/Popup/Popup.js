import React from 'react';
import styles from './Popup.module.css';

export const Popup = (props)=> {
    return (
        <div className={styles.Container} style={{
            left: props.clickCapture.clientX,
            top:  props.clickCapture.clientY
            }}>
            {props.children}
        </div>
    )
};