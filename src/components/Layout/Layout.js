import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component {
  state={
    sideDrawerShow: true,
  };

  backdropHideHandler = () => {
    this.setState({sideDrawerShow: false});
  }
  menuClickHandler = () => {
    this.setState({sideDrawerShow: true});
  }
  render() {
    return (
      <Aux>
        <Toolbar showSideDrawer={this.menuClickHandler}/>
        <SideDrawer backdropShow={this.state.sideDrawerShow} hide={this.backdropHideHandler}/>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
