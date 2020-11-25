import React from 'react';
import styles from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
  let sideDrawerStyles = [styles.SideDrawer, styles.Close];
  if(props.backdropShow){
  sideDrawerStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop active={props.backdropShow} cancel={props.hide}/>
      <div className={sideDrawerStyles.join(' ')} onClick={props.hide}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <Navigation isAuth={props.isAuth} />
      </div>
    </Aux>
  );
};

export default sideDrawer;
