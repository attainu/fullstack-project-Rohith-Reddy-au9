/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { getProduct, productStar, getRelatedProduct } from '../function/product'
import  SingleProduct  from "../components/card/singleProduct"
import { useSelector } from 'react-redux'
import ProductCard from "../components/card/ProductCard"

const ProductView = ({match}) =>{

  const { user } = useSelector((state) => ({ ...state}))

  const [ product, setProduct ] = useState({})
  const [related, setRelated] = useState([])
  const [ star, setStar ] = useState(0)

  const { slug } = match.params

  useEffect(() => {
      loadProductDetails()
  }, [slug])

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, []);

  const loadProductDetails = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      // related products
      getRelatedProduct(res.data._id).then((res)=>setRelated(res.data))
    })

  } 

  const onStartClick = (newrating, name) =>{
    setStar(newrating)
    // console.log(newrating, name)
    productStar(name, newrating, user.token)
    .then((res) =>{
      console.log("rated product>>", res.data)
      loadProductDetails();
    })
    
  }

  return (
    <div className="container-fluid"> 
      <div className="row pt-4">
        <SingleProduct 
          product={product} 
          onStartClick = {onStartClick}
          star = {star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
            <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
    
}

export default ProductView