import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';
import { FluxStandardAction } from '__utils/type';

interface HomeProps {
	dispatch: Dispatch<FluxStandardAction>;
}

const Home: React.FC<HomeProps> = () => {
	return (
		<div>
			<p>Welcome To Bidmint</p>
			<hr />
			{/* 
             1. Bug filed for push function of connected-react-router - https://github.com/supasate/connected-react-router/issues/319
             2  Separate branch cut out maintained @ https://gitlab.com/turtlemint/tm-boilerplate/tree/bug-in-push-connected-react-router
            <nav>
                <button onClick={() => {
                    dispatch(push('/'));
                }}>Home</button>
                <button onClick={() => {
                    dispatch(push('/about'));
                }}>about</button>
            </nav> */}
		</div>
	);
};

export default connect(null)(Home);
