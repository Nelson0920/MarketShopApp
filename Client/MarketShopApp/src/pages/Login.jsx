import React, { useRef, useState } from 'react';
import '@styles/Login.scss';
import { instance } from '../app/axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Login = () => {
	const form = useRef(null)
	const [Error, setError] = useState('')
	const handleSubmit = (event) => {
		let dato = {
			form: {
				email: '',
				password: ''
			}
		}
		const formData = new FormData(form.current)
		dato = {
			form: {
				email: formData.get('email'),
				password: formData.get('password')
			}
		}

		instance.post("/signin", dato.form)
			.then((result) => {
				var data = result.data.data[0]
				if (result.data.status) {
					cookies.set('id_usr', data.id_usr, { path: '/' })
					cookies.set('name', data.name, { path: '/' })
					cookies.set('name_usr', data.nam_usr, { path: '/' })
					cookies.set('ema_usr', data.ema_usr, { path: '/' })
					cookies.set('niv_acc', data.niv_acc, { path: '/' })
					result = 0
					window.location.href = "./home"
				} else {
					window.location.href = "./login"
				}
			})
			.catch((err) => {
				setError(
					<div className='alertError2'>
						<b>Wrong username or password!!!</b>
					</div>
				)
			});
	}
	const signup = () => {
		window.location.href = "./"
	}

	return (
		<div className="Login">
			<div className="Login-container">
				{Error}
				<h1 className="titleL">Login</h1>
				<form action="/" className="form" ref={form}>
					<label htmlFor="email" className="label">Email address</label>
					<input type="text" name="email" placeholder="name@example.com" className="input input-email" />
					<label htmlFor="password" className="label">Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password" />
					<input type="button" className="primary-button login-button" value="Login" onClick={() => handleSubmit()} />
				</form>
				<button onClick={() => signup()} className="secondary-button signup-button">
					Sign up
				</button>
			</div>
		</div>
	);
}

export default Login;
