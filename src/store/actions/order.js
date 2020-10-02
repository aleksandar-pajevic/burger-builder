import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return{
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return{
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios
    .post('/orders.json', orderData)
    .then((respose) => {
      console.log('purchaseBurgerStart res.data', respose.data);
     dispatch(purchaseBurgerSuccess(respose.data, orderData))
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err))
    });
  }
};