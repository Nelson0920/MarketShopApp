import React from 'react';
import '@styles/CreateAccount.scss';
import {instance} from '../app/axios'

export const CreateAccount = () => {


	const handlButton = () => {
        const name = document.getElementById("name").value
        const username = document.getElementById("username").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

      	const data = {
            name,
            username,
            email,
            password
        }
		if(name && username &&  email &&  password){
			instance.post("/signup", data)
			.then((result) => {
				window.location.assign("./login")
			})
			.catch((err) => {
				alert(err.response.data.message)
			});
		}else{
			alert('Complete all fields!!!')
		}

    }

	function login (){
		window.location.href="./login"
	}
    
	return (
		<div className="CreateAccount">
			<div className="CreateAccount-container">
				<h1 className="title">My account</h1>
				<form action="/" className="form">
					<div>
						<label for="name" className="label">Name</label>
						<input type="text" id="name" placeholder="Full Name" className="input input-name" />
						<label for="username" className="label">User</label>
						<input type="text" id="username" placeholder="User Name" className="input input-email" />
						<label for="email" className="label">Email</label>
						<input type="text" id="email" placeholder="name@example.com" className="input input-email" />
						<label for="password" className="label">Password</label>
						<input type="password" id="password" placeholder="************" className="input input-password" />
					</div>
					<input type="button" value="Create" className="primary-button login-button" onClick={handlButton} />

					<input type="button" value="Login" className="secondary-button signup-button" onClick={() => login()} />
				</form>
			</div>
		</div>
	);
}