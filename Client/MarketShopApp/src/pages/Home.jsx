import React from 'react';
import ProductList from '@containers/ProducList';
import Header from '@components/Header';

const Home = (user) => {
	return (
		<>
			<Header usur={user} />
			<ProductList />
		</>
	);
}

export default Home;
