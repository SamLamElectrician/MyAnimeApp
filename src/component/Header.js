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
					{user ? <Link to='/home'>Home</Link> : <Link to='/home2'>Home</Link>}
				</li>
				<li>
					<Link to='/'>About</Link>
				</li>
				<li>{user ? <Link to='/history'>Your List</Link> : null}</li>
				<li>
					{user ? (
						<Link to='/' onClick={logOut}>
							Log out
						</Link>
					) : (
						<Link to='/login'>Login</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Header;
