import React from 'react';
import '@styles/Menu.scss';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Menu = () => {
	const signup = () =>{
		cookies.remove('id_usr', {path: '/'})
		cookies.remove('name', {path: '/'})
		cookies.remove('name_usr', {path: '/'})
		cookies.remove('ema_usr', {path: '/'})
		cookies.remove('niv_acc', {path: '/'})
		window.location.href='./'
	}
	return (
		<div className="Menu">
			<ul>
				<li>
					<a href="/home" className="title">Home</a>
				</li>
				<li>
					<a onClick={() => signup()}>Sign out</a>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
