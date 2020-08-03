import React from 'react';
import ReactDom from 'react-dom';
import Loading from '../../../Loading';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders and unmounts without crashing', () => {
	const div = document.createElement('div');
	ReactDom.render(<Loading />, div);
	ReactDom.unmountComponentAtNode(div);
});
