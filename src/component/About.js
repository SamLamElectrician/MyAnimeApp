import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const About = () => {
	return (
		<>
			<Header></Header>
			<div className='popUp'>
				<div className='popUpInner'>
					<h2>Welcome To Sam's Anime List Project</h2>
					<p>
						This is my react project where I compile data from the Jikan API to
						return a list of random animes on the home page. You can also query
						for the anime that you would want to watch! I am currently working
						on the functionality of including firebase to store your list and a
						google sign in option.
					</p>
					<Link link to='/Home2'>
						<button>Click to Start</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default About;
