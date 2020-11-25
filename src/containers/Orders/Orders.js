import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spiner/Spinner'
class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />
    if(this.props.orders){
      orders =       <div>
      {this.props.orders.map((order) => {
        return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>;
      })}
    </div>
    } 
    return (
      orders
    );
  }
}

const mapStateToProps = (state) => {
  return{
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchOrders: (token, userId)=>{dispatch(actions.fetchOrders(token, userId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));
