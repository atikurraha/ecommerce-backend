import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { addToWishlist } from '../actions/wishlistActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
        <button className="wishlist-btn" onClick={handleAddToWishlist}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
      <div className="product-info">
        <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
        <div className="price">
          {product.discountPrice ? (
            <>
              <span className="discount-price">${product.discountPrice}</span>
              <span className="original-price">${product.price}</span>
            </>
          ) : (
            <span className="current-price">${product.price}</span>
          )}
        </div>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
          <span className="review-count">({product.numReviews})</span>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
