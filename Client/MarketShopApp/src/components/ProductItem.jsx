import React, { useContext } from 'react';
import '@styles/ProductItem.scss';
import iconItem from '@icons/bt_add_to_cart.svg'
import AppContext from '../context/AppContext'

const ProductItem = ({product}) => {
	const { addToCart } = useContext(AppContext)

	const handleClikc = item =>{
		addToCart(item)
	}
	return (
		<div className="ProductItem">
			<img src={'http://localhost:3000/'+product.nam_img} alt={product.nam_prd} />
			<div className="product-info">
				<div>
					<p>{product.nam_prd}</p>
					<p>Category: {product.cat_prd}</p>
					<p>${product.prc_prd}</p>
				</div>
				<figure onClick={() => handleClikc(product)}>
					<img src={iconItem} alt="" />
				</figure>
			</div>
		</div>
	);
}
export default ProductItem;
