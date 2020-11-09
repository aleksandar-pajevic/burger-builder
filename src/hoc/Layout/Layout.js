import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
        <Toolbar isAuth={this.props.isAuth} showSideDrawer={this.menuToggleHandler}/>
        <SideDrawer isAuth={this.props.isAuth} backdropShow={this.state.sideDrawerShow} hide={this.backdropHideHandler}/>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    isAuth: state.auth.token !== null,
  }
};

export default connect(mapStateToProps, null)(Layout);
