import React, {useState, useContext} from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import '@styles/MyOrder.scss';
import iconOrder from "@icons/flechita.svg"

const MyOrder = () => {
	const {state} = useContext(AppContext)
	const [toggleOrders, setToggleOrders] = useState(true)

	const sumTotal = () =>{
		const reducer = (counter, value) => counter + parseInt(value.prc_prd)
		const sum = state.cart.reduce(reducer, 0)
		return sum
	}

	const handleToggleOrders = () =>{
		setToggleOrders(!toggleOrders)
	}

	return (
		<>
		{toggleOrders &&
		<aside className="MyOrder">
			<div className="title-container">
				<img src={iconOrder} alt="arrow" className='imgExit' onClick={handleToggleOrders}/>
				<p className="title">My order</p>
			</div>
			<div className="my-order-content">
				{state.cart.map((product, index) => (
					<OrderItem  product={product} key={index} indexValue={index}/>
				))}
			</div>
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>${sumTotal()}</p>
				</div>
				<button className="primary-button">
					Checkout
				</button>
		</aside>
		}
		</>

	);
}

export default MyOrder;