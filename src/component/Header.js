import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import { useUserAuth } from '../context/UserAuthContext';

const Header = () => {
	const { user, logOut } = useUserAuth();
	return (
		<nav className='headerNav'>
			<div className='leftHeader'>
				<img src={Logo} alt="Sam's Anime List Logo" />
			</div>
			<ul className='rightNav'>
				<li>
					<Link to='/home'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>{user ? <Link>Your List</Link> : null}</li>
				<li>
					{user ? (
						<Link to='/' onClick={logOut}>
							Log out
						</Link>
					) : (
						<Link to='/'>Login</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Header;
