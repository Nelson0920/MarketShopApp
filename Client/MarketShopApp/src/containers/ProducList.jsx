import React, { useState } from 'react';
import ProductItem from '@components/ProductItem';
import useGetProducts from '@hooks/useGetProducts';
import '@styles/ProductList.scss';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const API = 'http://localhost:3000/getImage';
const options = ['all', 'electric', 'mechanic', 'construction'];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
	{
		imgPath:
			'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x10000:format=png/path/sd86918617d748ae8/image/i7b36078371b7f9fb/version/1620066824/promociones-de-ventas.png',
	},
	{
		imgPath:
			'https://arrontesybarrera.com/creatibo/wp-content/uploads/2021/03/Vaya_vaca_servicios_agencia_de_publicidad_asturias_Creatibo-1300x614.png',
	},
	{
		imgPath:
			'https://crm.aftgrupo.com/documentacion/70/modelos-ferreterias-pequenas.jpg',
	},
	{
		imgPath:
			'https://image.jimcdn.com/app/cms/image/transf/none/path/sd86918617d748ae8/image/i9acadebcec8c58e7/version/1613001123/casos-empresariales-caso-ikea.jpg',
	},
];

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="(#00) 000-0000"
			definitions={{
				'#': /[1-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

TextMaskCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
	props,
	ref,
) {
	const { onChange, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={(filter2) => {
				onChange({
					target: {
						name: props.name,
						value: filter2.value,
					},
				});
			}}
			thousandSeparator
			valueIsNumericString
			prefix="$"
		/>
	);
});

NumericFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const ProductList = () => {
	let products = useGetProducts(API)
	const [filter, setfilter] = useState('')
	const [filter2, setfilter2] = useState('')
	const [filter3, setfilter3] = useState(options[0]);

	const handleChange = (event) => {
		setfilter2(event.target.value);
	};

	const buscar = () => {
		let nam = document.getElementById('name').value
		setfilter(nam.replace(/\s+/g, '').toLowerCase())
	}
	let data = products.map(product => {
		return product
	})
	let data2 = data.filter(product => {
		return product.nam_prd.toLowerCase() == filter
	})
	let data3 = data.filter(product => {
		return product.prc_prd == filter2
	})
	let data4 = data.filter(product => {
		return product.cat_prd == filter3
	})

	if (data2.length != 0) {
		products = data2
	} if (data3.length != 0) {
		products = data3
	}
	if (data4.length != 0) {
		products = data4
	}

	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};


	return (
		<section className="main-container">
			<Box sx={{ maxWidth: 1000, flexGrow: 1 }} className="carrusel">
				<AutoPlaySwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
				>
					{images.map((step, index) => (
						<div key={step.label}>
							{Math.abs(activeStep - index) <= 2 ? (
								<Box
									component="img"
									sx={{
										height: 400,
										display: 'block',
										maxWidth: 1000,
										overflow: 'hidden',
										width: '100%',
									}}
									src={step.imgPath}
									alt={step.label}
								/>
							) : null}
						</div>
					))}
				</AutoPlaySwipeableViews>
			</Box>
			<div className='title2'><i><h2>/// PRODUCTS ///</h2></i></div>
			<form action="" className='filter'>
				<Box
					sx={{
						'& > :not(style)': {
							m: 1,
						},
					}}
				>
					<TextField
						helperText=" "
						id="name"
						onChange={() => buscar()}
						label="Name of product"
					/>
					<TextField
						label="Price of products"
						value={filter2.numberformat}
						onChange={handleChange}
						name="numberformat"
						id="formatted-numberformat-input"
						InputProps={{
							inputComponent: NumericFormatCustom,
						}}
						variant="standard"
					/>
					<Autocomplete
						value={filter3}
						onChange={(event, newValue) => {
							setfilter3(newValue);
						}}
						id="controllable-states-demo"
						options={options}
						sx={{ width: 450 }}
						renderInput={(params) => <TextField {...params} label="Category" />}
					/>
				</Box>
			</form>
			<div className="ProductList">
				{products.map(product => (
					<ProductItem product={product} key={product.id} />
				))}
			</div>
		</section>
	);
}

export default ProductList;
