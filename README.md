This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Project built using React and PokeAPI to make a simple Single page application.

In order to run this project use the following command: 
$ npm start

Currently there a three routes configured, each one is rendering a different component.
"/": Renders the Landing component (src/components/landing)

"/pokemon/:name": Will simply render 'PokemonDetails' Component, which is used to fetch the pokemon data from the api and decide whether to render the loading component or the component in charge of displaying the fetched information to the user.

"/types": Renders the 'Types' Component. Upon render this component will then proceed to fetch data from https://pokeapi.co/api/v2/type and render a TypeCard component for each type found in that route. 

"/types/:id" Renders the 'TypesDetails' Component. 

### Dependencies: 
    @fortawesome/fontawesome-svg-core: 1.2.28
    @fortawesome/free-solid-svg-icons: 5.13.0
    @fortawesome/react-fontawesome: 0.1.10
    @testing-library/jest-dom: 4.2.4
    @testing-library/react: 9.5.0
    @testing-library/user-event: 7.2.1
    bootstrap: 4.5.0

    All of them can be installed using node package manager with the following command:
    $npm install <package-name>
