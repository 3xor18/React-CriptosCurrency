import React, {
	useEffect,
	useState,
} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import { Error } from './Error';

const Boton = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

export const Formulario = ({
	guardarMoneda,
	guardarCriptoMoneda,
}) => {
	const [error, setError] = useState(false);
	const [
		listaCriptos,
		setListaCriptos,
	] = useState([]);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'USD Dollar' },
		{ codigo: 'MXN', nombre: 'Peso Mexicano' },
		{ codigo: 'CLP', nombre: 'Peso Chileno' },
		{ codigo: 'COP', nombre: 'Peso Colombiano' },
	];

	const [moneda, SelectMonedas] = useMoneda(
		'Elige tu moneda',
		'',
		MONEDAS
	);

	const [
		criptoMoneda,
		SelecctCripto,
	] = useCriptomoneda(
		'Elige tu criptomoneda',
		'',
		listaCriptos
	);

	const consultarApi = async () => {
		const url =
			'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
		const resultado = await axios.get(url);
		setListaCriptos(resultado.data.Data);
	};

	useEffect(() => {
		consultarApi();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (moneda === '' || criptoMoneda === '') {
			setError(true);
			return;
		}
		setError(false);
		guardarCriptoMoneda(criptoMoneda);
		guardarMoneda(moneda);
	};

	return (
		<form onSubmit={handleSubmit}>
			{error && (
				<Error mensaje="Todos los campos son obligatorios" />
			)}
			<SelectMonedas />
			<SelecctCripto />
			<Boton type="submit" value="Calcular" />
		</form>
	);
};
