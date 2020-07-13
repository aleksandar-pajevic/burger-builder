import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = (props) => {
  return props.active ? <div className={styles.Backdrop} onClick={props.cancel}></div> : null;
};

export default backdrop;
