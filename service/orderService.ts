import {appAxios} from './interceptor';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items,
      branch: '66fb8427fc6216a132baa7c1',
      totalPrice,
    });
    console.log('Order response: ', response);
    return response;
  } catch (er) {
    console.log('Create Order error: ', er);
  }
};

export const getAllOrders = async () => {
  try {
    const api = await appAxios.get('/order', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = api.data;
    console.log('data of get all orders: ', data);
    return data;
  } catch (er) {
    console.log('error: ', er);
    return er;
  }
};
