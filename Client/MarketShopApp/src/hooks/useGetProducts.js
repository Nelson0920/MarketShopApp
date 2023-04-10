import { useEffect, useState } from 'react';

const useGetProducts = (API) =>{
	const [image, setimage] = useState([])

	useEffect(() => {
	fetch(API)
	.then(res => res.json())
	.then(res => setimage(res))
	.catch(err => {
		console.error(err)
	})
	}, [])
    return image
}

export default useGetProducts