import React, {useContext} from 'react';
import AppContext from '@context/AppContext'
import '@styles/OrderItem.scss';
import iconClose from '@icons/icon_close.png'

const OrderItem = (props) => {
	const {product, indexValue} = props
	const {removeFromCart} = useContext(AppContext)

	const handleRemove = index =>{
		removeFromCart(index)
	}

	return (
		<div className="OrderItem">
			<figure>
				<img src={'http://localhost:3000/'+product.nam_img}  alt={product.nam_prd} />
			</figure>
			<p>{product.nam_prd}</p>
			<p>${product.prc_prd}</p>
			<img src={iconClose} alt="close" className='deleteProduct' onClick={() => handleRemove(indexValue)} />
		</div>
	);
}

export default OrderItem;
