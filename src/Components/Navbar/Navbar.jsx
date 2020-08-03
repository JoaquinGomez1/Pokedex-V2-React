import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
	const [ searchVal, setSearchVal ] = useState();

	const handleClick = async () => {
		// check if the search values is not empty
		if (searchVal) {
			const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchVal.toLowerCase()}`);
			const pokemon = await req.json();
			if (pokemon.id) {
				// Needs to be changed every time the domain changes...
				// TODO: Figure out a method to automate this process
				window.location.href = `http://localhost:3000/pokemon/${pokemon.id}`;
			}
		}
	};

	return (
		<Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
			<Container
				fluid={false}
				style={{
					width: '70%',
					padding: '3%',
					backgroundColor: '#e0244d',
					color: 'white',
					textAlign: 'center',
					textShadow: '2px 2px 4px rgba(0,0,0,.4)',
					fontFamily: 'sans-serif'
				}}
				bsPrefix="insideContainer"
			>
				<Link style={{ textDecoration: 'none', color: 'white' }} to="/">
					<h1>PokePedia V2</h1>
				</Link>
				<h3>Built with React</h3>
				<div className="searchBar">
					<input
						style={{ padding: '10px 30px' }}
						type="text"
						className="inputSearch"
						onChange={e => {
							setSearchVal(e.target.value);
						}}
					/>
					<button
						style={{
							padding: '9px 14px',
							marginLeft: '5px',
							border: 'none',
							backgroundColor: '#d95e3f',
							boxShadow: '1px 1px 3px rgba(0,0,0,.3)',
							cursor: 'pointer',
							color: 'white',
							fontWeight: '600'
						}}
						variant="primary"
						onClick={handleClick}
					>
						Search
					</button>
				</div>

				<div
					style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '30px' }}
					className="categories"
				>
					<Link to="/">
						<button className="categoryPokemons">Pokemons</button>
					</Link>

					<Link to="/types">
						<button className="categoryTypes">Types</button>
					</Link>
				</div>
			</Container>
		</Container>
	);
}
