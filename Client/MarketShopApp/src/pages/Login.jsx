import React, {useRef} from 'react';
import '@styles/Login.scss';
import {instance} from '../app/axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Login = () => {
	const form = useRef(null)
	const handleSubmit = (event) =>{
		let dato = {
			form:{
				email: '',
				password: ''
			}
		}
		const formData = new FormData(form.current)
		dato = {
			form:{
				email: formData.get('email'),
				password: formData.get('password')
			}
		}

		instance.post("/signin", dato.form)
		.then((result) => {
			var data = result.data.data[0]
			console.log(data)
			alert(result.data.message)
			if(result.data.status){
				cookies.set('id_usr', data.id_usr, {path: '/'})
				cookies.set('name', data.name, {path: '/'})
				cookies.set('name_usr', data.nam_usr, {path: '/'})
				cookies.set('ema_usr', data.ema_usr, {path: '/'})
				cookies.set('niv_acc', data.niv_acc, {path: '/'})
				result = 0
				window.location.href="./home"
			}else{
				window.location.href="./login"
			}
		})
		.catch((err) => {
			alert('Wrong username or password, please try again!!!')
		});
	}
	const signup = () =>{
		window.location.href="./"
	}

	return (
		<div className="Login">
			<div className="Login-container">
			<p className="title">Login</p>
				<form action="/" className="form" ref={form}>
					<label htmlFor="email" className="label">Email address</label>
					<input type="text" name="email" placeholder="name@example.com" className="input input-email"/>
					<label htmlFor="password" className="label">Password</label>
					<input type="password" name="password" placeholder="*********" className="input input-password"/>
					<input type="button" className="primary-button login-button"  value="Login" onClick={() => handleSubmit()} />
				</form>
				<button onClick={() => signup()} className="secondary-button signup-button">
					Sign up
				</button>
			</div>
		</div>
	);
}

export default Login;
