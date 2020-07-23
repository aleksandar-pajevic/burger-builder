import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    clickedModalHandler = ()=>{
      this.setState({error: null})
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        this.setState({ error: error });
      });
    };

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    //With interceptors in constructor Error message don't show, don't know why :D
    // constructor(props){
    //   super();
    //   axios.interceptors.request.use((request) => {
    //     this.setState({ error: null });
    //     return request;
    //   });
    //   axios.interceptors.response.use(res => res, (error) => {
    //     this.setState({ error: error });
    //   });
    // }

    render() {
      return (
        <Aux>
          <Modal 
          show={this.state.error}
          cancel={this.clickedModalHandler}>
            {this.state.error ? this.state.error.message : null}
            </Modal>
          <WrapedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
