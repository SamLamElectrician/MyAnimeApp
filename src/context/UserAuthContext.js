import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase';
// create a new context to track whether user is authenticated throughout the app
const userAuthContext = createContext();
// this function provides the rest of the app with all the necessary functions for user auth management (e.g. login, logout etc.)
export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});
	const [savedAnime, setSavedAnime] = useState([]);
	// This allows user to log in with the email pw combo they created
	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	// This allows the user to sign up assuming sign up with email / password
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	// This allows the user to log out whether signed in anonymously or via email/pw creation
	function logOut() {
		return signOut(auth);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}
	// this useEffect is to set the current user to whoever is logged in when auth state changes (either logged in as email/pw or anonymously)
	// returns a function that allows the db auth state listener to unsubscribe when component dismounts
	// onAuthStateChanged returns the current user logged in
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			// console.log('Auth', currentuser);
			setUser(currentuser);
		});
		// remove db auth state change listener when component dismounts
		return () => {
			unsubscribe();
		};
		// empty dependency array as we want the listener to mount on page load (will persist until dismount)
	}, []);

	return (
		// this provider allows us to use all the auth functions and access user value anywhere across the app
		// everything in app.js is wrapped inside <UserAuthContextProvider></userAuthContext.Provider> so that all the children components can access the auth properties
		<userAuthContext.Provider
			value={{
				user,
				logIn,
				signUp,
				logOut,
				googleSignIn,
				setSavedAnime,
				savedAnime,
			}}
		>
			{children}
		</userAuthContext.Provider>
	);
}

// this useUserAuth() function can be used in other components to get the auth and user info
// e.g., in a component:
// 1. first import the context: import { useUserAuth } from '../context/UserAuthContext';
// 2. access the needed properties:  const { logIn, logInAsDemo } = useUserAuth();
// 3. call the auth functions using try/catch and await:
// try {
//   await logIn(email, password);
//   // redirect user to the login page following a successful sign up
//   navigate('/');
// } catch (err) {
//   setError(err.message);
//   alert(error);
// }
export function useUserAuth() {
	return useContext(userAuthContext);
}
