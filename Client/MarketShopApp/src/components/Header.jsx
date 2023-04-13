import React, { useState, useContext } from 'react';
import '@styles/Header.scss';
import menu from '@icons/icon_menu.svg'
import iconCart from '@icons/icon_shopping_cart.svg'
import MyOrder from '@containers/MyOrder'
import Menu from '@components/Menu'
import AppContext from '@context/AppContext'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Header = () => {
	const [toggle, setToggle] = useState(false)
	const [toggleOrders, setToggleOrders] = useState(false)

	const { state } = useContext(AppContext)

	const handleToggle = () => {
		setToggle(!toggle)
	}
	const handleToggleOrders = () => {
		setToggleOrders(!toggleOrders)
	}
	let createProduct
	if (cookies.get('niv_acc') == "admin") {
		createProduct =
			<li className='createProductsButton'>
				<Button variant="contained" href="/create-product">Create product</Button>
			</li>
	}

	return (
		<nav className='navPage'>
			<img src={menu} alt="menu" className="menu" />
			<div className="navbar-left">
				<h1>MarketShopApp</h1>
			</div>
			<div className="navbar-right">
				<ul>
					<li className="navbar-email" >
						{`USER: ${cookies.get('name_usr')} // ${cookies.get('ema_usr')}`}
					</li>
					{createProduct}
					<li className='createProductsButton'>
						<Button variant="contained" onClick={handleToggle}>Menu</Button>
					</li>
					<li className="navbar-shopping-cart" onClick={handleToggleOrders}>
						<img src={iconCart} alt="shopping cart" />
						{state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
					</li>
				</ul>
			</div>
			{toggle && <Menu />}
			{toggleOrders && <MyOrder />}
		</nav>
	);
}

export default Header;