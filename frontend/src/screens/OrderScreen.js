// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { detailsOrder } from '../actions/orderActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

// export default function OrderScreen (props) {
//   const {id} = useParams();
//   // const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order , loading, error } = orderDetails; //destructuring
//   const dispatch = useDispatch();

//     useEffect(() => {
//       dispatch(detailsOrder(id));
//     }, [dispatch, id]);
//     return loading ? (
//       <LoadingBox></LoadingBox>
//     ) : error ? (
//       <MessageBox variant="danger">{error}</MessageBox>
//     ) :  (
//     <div>
//       <h1>order {order._id}</h1>
//       <div className="row top">
//         <div className="col-2">
//           <ul>
//             <li>
//               <div className="card card-body">
//                 <h2>Shipping</h2>
//                 <p>
//                   <strong>Name:</strong> {order.shippingAddress.fullName} <br />
//                   <strong>Address: </strong> {order.shippingAddress.address},
//                   {order.shippingAddress.city}, {order.shippingAddress.postalCode}
//                   ,{order.shippingAddress.country}
//                 </p>
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Payment</h2>
//                 <p>
//                   <strong>Method:</strong> {order.paymentMethod}
//                 </p>
//               </div>
//             </li>
//             <li>
//               <div className="card card-body">
//                 <h2>Order Items</h2>
//                 <ul>
//                   {order.orderItems.map((item) => (
//                     <li key={item.product}>
//                       <div className="row">
//                         <div>
//                           <img
//                             src={item.image}
//                             alt={item.name}
//                             className="small"
//                           ></img>
//                         </div>
//                         <div className="min-30">
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </div>

//                         <div>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         </div>
//         <div className="col-1">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2>Order Summary</h2>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Items</div>
//                   <div>${order.itemsPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Shipping</div>
//                   <div>${order.shippingPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>Tax</div>
//                   <div>${order.taxPrice.toFixed(2)}</div>
//                 </div>
//               </li>
//               <li>
//                 <div className="row">
//                   <div>
//                     <strong> Order Total</strong>
//                   </div>
//                   <div>
//                     <strong>${order.totalPrice.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </li>
//               <li>
//                 <button
//                   type="button"

//                   className="primary block"
//                   disabled={order.orderItems.length === 0}
//                 >
//                   Place Order
//                 </button>
//               </li>
              
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function OrderScreen(props) {
  const { id } = useParams();
  const [clientId, setClientId] = useState('');
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPayPalClientId = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      setClientId(data);
    };

    if (!order) {
      dispatch(detailsOrder(id));
    } else {
      if (!order.isPaid && !clientId) {
        fetchPayPalClientId();
      }
    }
  }, [dispatch, order, id, clientId]);

  const successPaymentHandler = (paymentResult) => {
    // TODO: dispatch pay order
    console.log('Payment success:', paymentResult);
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && clientId && (
                <li>
                  <PayPalScriptProvider options={{ 'client-id': clientId }}>
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice.toFixed(2),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          successPaymentHandler(details);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}