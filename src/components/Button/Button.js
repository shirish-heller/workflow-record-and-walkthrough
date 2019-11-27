import React from 'react';
import styles from './Button.module.css';

const Button = (props)=> {
    return (
      <button
        className={styles.Button}
        style={props.style}
        onClick={props.onClick}>
            {props.label}
            {props.children}
            
      </button>
    );
}

export default Button;