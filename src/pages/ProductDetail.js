import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishlistActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity, selectedSize, selectedColor));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  return (
    <div className="product-detail-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="product-detail">
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`${product.name} ${index}`} />
                ))}
              </div>
            </div>
            
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
                <span className="review-count">({product.numReviews} reviews)</span>
              </div>
              
              <div className="price">
                {product.discountPrice ? (
                  <>
                    <span className="discount-price">${product.discountPrice}</span>
                    <span className="original-price">${product.price}</span>
                    <span className="discount-percent">
                      {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="current-price">${product.price}</span>
                )}
              </div>
              
              <p className="description">{product.shortDescription}</p>
              
              <div className="options">
                {product.sizes.length > 0 && (
                  <div className="size-selector">
                    <h3>Size:</h3>
                    <div className="size-options">
                      {product.sizes.map((size, index) => (
                        <button 
                          key={index}
                          className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.colors.length > 0 && (
                  <div className="color-selector">
                    <h3>Color:</h3>
                    <div className="color-options">
                      {product.colors.map((color, index) => (
                        <button 
                          key={index}
                          className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="quantity-selector">
                  <h3>Quantity:</h3>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="actions">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
                <button className="buy-now-btn">Buy Now</button>
                <button className="wishlist-btn" onClick={handleAddToWishlist}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              
              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <p>Free shipping on orders over $50</p>
                <p>Estimated delivery: 3-5 business days</p>
              </div>
              
              <div className="share-options">
                <h3>Share:</h3>
                <div className="social-icons">
                  {/* Social media icons here */}
                </div>
              </div>
            </div>
          </div>
          
          <div className="product-tabs">
            <div className="tabs">
              <button className="tab active">Description</button>
              <button className="tab">Specifications</button>
              <button className="tab">Reviews</button>
              <button className="tab">Q&A</button>
            </div>
            
            <div className="tab-content">
              <div className="tab-pane active">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
