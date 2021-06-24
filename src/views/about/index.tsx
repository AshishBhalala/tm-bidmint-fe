import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AboutSelector from './about.selector';

interface AboutProps {
	someProp: string;
}

const About: React.FC<AboutProps> = () => {
	const { data, error } = useSelector(AboutSelector);
	const dispatch = useDispatch();

	return (
		<div>
			<p>About page</p>
			<ul>
				<li>
					<button
						onClick={() => dispatch({ type: 'ABOUT_API_FETCH' })}
						type="submit"
					>
						TRIGGER API
					</button>
				</li>
				<div>
					{error ? (
						<p>{JSON.stringify(error)}</p>
					) : (
						<div>
							{data.map((item: string | number) => {
								return (
									<div key={item}>{JSON.stringify(item)}</div>
								);
							})}
						</div>
					)}
				</div>
				<li>
					<Link to="/">Home</Link>
				</li>
			</ul>
		</div>
	);
};

export default About;
