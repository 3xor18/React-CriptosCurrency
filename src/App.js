import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import imagen from './assets/cryptomonedas.png';
import { Cotizacion } from './components/Cotizacion';
import { Formulario } from './components/Formulario';
import { Spiner } from './components/Spiner';

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Heading = styled.h1`
	font-family: 'Bebas Neue', cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;
	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
	}
`;

const Imagen = styled.img`
	max-width: 100%;
	margin-top: 5rem;
`;

function App() {
	const [cargando, setCargando] = useState(false);
	const [moneda, guardarMoneda] = useState('');
	const [
		criptoMoneda,
		guardarCriptoMoneda,
	] = useState('');

	const [resultado, setresultado] = useState({});

	const fecthApi = async () => {
		const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
		const res = await axios.get(url);
		setresultado(
			res.data.DISPLAY[criptoMoneda][moneda]
		);
	};

	useEffect(() => {
		if (moneda === '') return;
		setCargando(true);

		setTimeout(() => {
			fecthApi();
			setCargando(false);
		}, 2000);
	}, [moneda, criptoMoneda]);

	return (
		<Contenedor>
			<div>
				<Imagen src={imagen} alt="criptos" />
			</div>
			<div>
				<Heading>
					Cotiza Criptomonedas al Instante
				</Heading>
				<Formulario
					guardarMoneda={guardarMoneda}
					guardarCriptoMoneda={
						guardarCriptoMoneda
					}
				/>
				{cargando && <Spiner />}
				<Cotizacion resultado={resultado} />
			</div>
		</Contenedor>
	);
}

export default App;
