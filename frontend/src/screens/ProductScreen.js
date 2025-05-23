import React, { useEffect, useState } from 'react'
import {useParams, Link, useNavigate} from "react-router-dom"
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen() {
  const navigate=useNavigate();
 const  dispatch= useDispatch();
 const {id} = useParams();  
 const productId = id;
 const [qty, setQty] = useState(1);
const productDetails = useSelector(state => state.productDetails);
const {loading, error, product}=productDetails;
useEffect(() => {
  dispatch(detailsProduct(productId))
},[dispatch,productId])
const addToCartHandler = () =>{
  navigate(`/cart/${productId}?qty=${qty}`); 
}
    return (
      <div>
      { loading ? (
         <LoadingBox></LoadingBox>
        ): error ? (
         <MessageBox variant="danger">{error}</MessageBox>
        ):(
          <div>
     <Link to="/"> Back to result</Link>
      <div className='row top'>
        <div className='col-2'>
         <img className='large' src={product.image} alt={product.name}></img>
        </div>
        <div className='col-1'>
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating rating={product.rating}></Rating>
              </li>
              <li>Price: ${product.price}</li>
              <li>Description : <p>{product.description}</p></li>
            </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <div className='row'>
                  <div>Price </div>
                  <div className='price'>${product.price}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Status</div>
                  <div>
                 {/* TERNAIRE === if else */}
                    {product.countInStock>0 ? (
                      <span className='success'>In Stock</span> 
                    ):(
                      <span className='danger'>Unvailable</span>
                    )
                   }
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                     <>
                       <li>
                         <div className="row">
                           <div>Qty</div>
                           <div>
                             <select
                               value={qty}
                               onChange={(e) => setQty(e.target.value)}
                             >
                               {[...Array(product.countInStock).keys()].map(
                                 (x) => (
                                   <option key={x + 1} value={x + 1}>
                                     {x + 1}
                                   </option>
                                 )
                               )}
                             </select>
                           </div>
                         </div>
                       </li>
                       <li>
                         <button
                           onClick={addToCartHandler}
                           className="primary block"
                         >
                           Add to Cart
                         </button>
                       </li>
                     </>
                   )}
            </ul>
          </div>
          </div>
        </div>
      </div>
        )
        }      
  </div>
  

  )
}