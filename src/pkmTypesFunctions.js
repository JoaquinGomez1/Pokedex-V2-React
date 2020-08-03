const getBackgroundColor = pokmType => {
	if (!pokmType) return 'white';

	const COLORS_BY_TYPE = {
		fire: '#d95e3f',
		water: '#5aaedb',
		grass: '#48bd5f',
		flying: '#8ba9d9',
		poison: '#8d5bab',
		electric: '#d1b91f',
		bug: '#8bc26b',
		psychic: '#c25fa4',
		fighting: '#c28a5f',
		rock: '#9e7642',
		ground: '#7d5725',
		normal: '#a8a090',
		fairy: '#d492d4',
		ice: '#96d0d9',
		dragon: '#a81828',
		steel: '#809296',
		ghost: '#6060b0',
		dark: '#4d5054'
	};
	// pokmType has to be in square brackets because the parameter passed to the function it's a string
	return COLORS_BY_TYPE[pokmType];
};


// This function became pretty much obsolete because an api update. Do not use unless it absolute sense to use it
const defineMainType = types => {
	if (types.length >= 2) {
		if (types[0].type.name === 'normal') {
			// if there is more than one type ignores the normal type
			return types[1].type.name;
		} else if (types[1].type.name === 'normal') {
			return types[0].type.name;
		} else {
			return types[1].type.name; // <--This will also ignore flying type in case there is more than 1 type
		}
	} else {
		return types[0].type.name;
	}
};

export { getBackgroundColor, defineMainType };
