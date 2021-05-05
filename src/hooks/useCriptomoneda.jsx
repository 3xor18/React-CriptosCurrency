import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
	font-family: 'Bebas Neue', cursive;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	fomt-size: 2.4rem;
	margin-top: 2rem;
	display: block;
`;

const Select = styled.select`
	width: 100%;
	display: block;
	padding: 1rem;
	-webkit-appearance: none;
	border-radius: 10px;
	border: none;
	font-size: 1.2rem;
`;

const useCriptomoneda = (
	label,
	stateInicial,
	opciones
) => {
	const [state, setState] = useState(
		stateInicial
	);
	const SelecctCripto = () => (
		<>
			<Label>{label}</Label>
			<Select
				onChange={(x) => setState(x.target.value)}
				value={state}
			>
				<option value="">
					- Seleccione Cripto -
				</option>
				{opciones.map((opcion) => (
					<option
						key={opcion.CoinInfo.Id}
						value={opcion.CoinInfo.Name}
					>
						{opcion.CoinInfo.FullName}
					</option>
				))}
			</Select>
		</>
	);
	return [state, SelecctCripto, setState];
};

export default useCriptomoneda;
