import { Link } from "react-router-dom"
export default function CardProduct({ product }) {
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
          className="btn btn-primary-500 w-100 card-product__button text-light">
          加入購物車
        </button>
      </div>
      <h2 className="text-center fs-6 text-dark mb-3">{product.title}</h2>
      <p className="text-center text-primary-800 noto-serif-tc">
        NT$ <span className="fs-6">{product.price}</span>
      </p>
    </div>
  )
}
