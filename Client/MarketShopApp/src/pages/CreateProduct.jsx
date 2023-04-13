import React, {useState} from 'react';
import {instance2} from '../app/axios'
import '@styles/CreateProduct.scss';

const CreateProduct = () => {
    const [file, setFiles] = useState(null)
    const [Error, setError] = useState('')

    const upFile = e => {
        setFiles(e.target.files[0])
    }

    const handleSubmit = (event) =>{
		event.preventDefault()
        if(!file){
            setError(
                <div className='alertError2'>
                    <b>You must upload file!!!</b>
                </div>
            )
            return
        }else{
            var name = document.getElementById("name").value
            var price = document.getElementById("price").value
            var num = document.getElementById("num").value
            var category = document.getElementById("category").value
            
            if (name && price && num && category) {
                const formData = new FormData()
                formData.append('image', file)
                formData.append('data', name)
                formData.append('data1', price)
                formData.append('data2', num)
                formData.append('data3', category)
                instance2.post("/upload", formData)
                .then((result = result.text()) => {
                })
                .then(res => {
                    setlistUpdate(true)
                }
                ).catch((err) => {
                    console.error(err)
                });
                setFiles(null)
            }else{
                setError(
					<div className='alertError2'>
						<b>Complete all fields!!!</b>
					</div>
				)
            }
        }
	}

    const exist = () => {
        window.location.href="/home"
    }
	return (
		<div className="Login">
			<div className="product-container">
            {Error}
            <h1 className="titleP">Create Products</h1>
				<form action="/" className="form" encType='multipar/form-data'>
					<label htmlFor="email" className="label">Name of Product</label>
                    <input type="text" id='name'  className="input input-email"/>
					<label htmlFor="email" className="label">Price of Product</label>
                    <input type="number" id='price'  className="input input-email"/>
					<label htmlFor="email" className="label">Quantity of Products</label>
                    <input type="number" id='num'  className="input input-email"/>
					<label htmlFor="email" className="label">Category of Product</label>
                    <select name="niv_acc" id="category" class="form-select" tabindex="1">
                            <option value="1">All</option>
                            <option value="2">Electric</option>
                            <option value="3">Mechanic</option>
                            <option value="4">Construction</option>
                    </select>
					<label htmlFor="email" className="label">Image of Product</label>
					<input type="file" name="file" onChange={upFile} className="input input-email"/>
				</form>
                    <input type="submit" className="primary-button login-button" onClick={handleSubmit} value="Create" />
                
				<button onClick={() => exist()} className="secondary-button signup-button">
					Exist
				</button>
			</div>
		</div>
	);
}

export default CreateProduct;
