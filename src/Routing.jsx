import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import App from './Components/Landing/App';
import PokemonDetails from './Components/PokemonDetail/PokemonDetail';
import Types from './Components/Types/Types';
import TypesDetail from './Components/TypeDetail/TypesDetail';

export default function Routing() {
	return (
		<Router>
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route path="/" exact component={App} />
					<Route path="/types" exact component={Types} />
					<Route path="/pokemon/:name" component={PokemonDetails} />
					<Route path="/types/:name" component={TypesDetail} />
				</Switch>
			</React.Fragment>
		</Router>
	);
}
