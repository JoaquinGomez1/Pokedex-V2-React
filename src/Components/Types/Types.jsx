import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import TypeCardData from '../TypeCardData/TypeCardData';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Types() {
	const [ types, setTypes ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		fetchTypesList();
	}, []);

	async function fetchTypesList() {
		const url = 'https://pokeapi.co/api/v2/type';
		const req = await fetch(url);
		const data = await req.json();
		setTypes(data.results);
		console.log(data.results);

		// Indicates that we have received a response from the api
		setLoading(false);
	}

	return (
		<React.Fragment>
			<div className="containerFluid">
				<Container bsPrefix="bigContainer" className="justify-content-md-center">
					{loading ? (
						<Loading />
					) : (
						types.map((type, index) => (
							<Link style={{ textDecoration: 'none' }} key={type.name} to={`/types/${type.name}`}>
								{' '}
								<TypeCardData name={type.name} id={index + 1} key={type.id} />{' '}
							</Link>
						))
					)}
				</Container>
			</div>
		</React.Fragment>
	);
}
