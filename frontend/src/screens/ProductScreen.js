import React from 'react'
import data from '../data'
import {useParams , Link} from 'react-router-dom'
import Rating from '../components/Rating';


export default function ProductScreen(props) {
  //minimiser l'acces li dom et plus
    const { id } = useParams()
    const product= data.products.find((x)=> x._id===id);
  return (
    <div className='row-center'>
        <Link to="/">Back to result</Link>
        <div className='row-top'>
          <div className='col-2'>
            <img className='large' src={product.image} alt={product.name} />
          </div>
          <div className='col-1'>
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating rating={product.rating}></Rating>
              </li>
              <li>
                Price:${product.price}
              </li>
              <li>
                description :<p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className='col-1'>
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row ">
                      <h2>Price</h2>
                      <div className='price'>${product.price}</div>
                  </div>

                </li>
                <li>
                  <div className="row ">
                    <div>Status</div>
                    <div> 
                      {/* ternaira ===== if else */}
                      {product.CountInStock > 0 ? (
                        <span className='success'>In stock</span>
                      ):(
                        <span className='faild'>Out of Stock</span>
                      )
                      }
                    </div>
                  </div>
                </li>
                <li>
                  <button className='primary block'> Add to cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}
