import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spiner/Spinner'
class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders();
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchOrders: ()=>{dispatch(actions.fetchOrders())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));
