import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
export default function CardProduct({ children, product }) {
  return (
    <div className="card-product position-relative">
      <Link to={`/product-details/${product.id}`} className="stretched-link"></Link>
      <div className="card-product__image mb-4 position-relative overflow-hidden">
        <img
          className="w-100 object-fit-cover object-position-center"    
          src={product.imageUrl}
          alt={product.title} />
        <button
          type="button"
          className="btn btn-primary-600 w-100 card-product__button text-light py-4">
          加入購物車
        </button>
      </div>
      <h2 className="text-center fs-6 text-dark mb-3">{product.title}</h2>
      { children }
      <p className="text-center text-primary-800 noto-serif-tc">
        NT$ <span className="fs-6">{product.price}</span>
      </p>
    </div>
  )
}

CardProduct.propTypes = {
  children: PropTypes.node,
  product: PropTypes.object
}

