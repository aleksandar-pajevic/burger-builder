import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div onClick={props.showSideDrawer}>MENU</div>
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
