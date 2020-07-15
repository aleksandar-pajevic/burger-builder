import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
  state={
    sideDrawerShow: false,
  };

  backdropHideHandler = () => {
    this.setState({sideDrawerShow: false});
  }
  menuToggleHandler = () => {
    this.setState((prevState)=>{
      return{sideDrawerShow: !prevState.sideDrawerShow}
    });
  }
  render() {
    return (
      <Aux>
        <Toolbar showSideDrawer={this.menuToggleHandler}/>
        <SideDrawer backdropShow={this.state.sideDrawerShow} hide={this.backdropHideHandler}/>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
