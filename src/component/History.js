import React from 'react';
import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import AnimeCard from './AnimeCard';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebase';
import Header from './Header';
import { useEffect } from 'react';

export default function History() {
	const { user } = useUserAuth();
	const [savedAnime, setSavedAnime] = useState([]);
	useEffect(() => {
		// const getFirebaseData = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/`);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			// console.log('snapshot:', data);
			setSavedAnime(data);
		});
		// };
	}, []);

	return (
		<>
			<Header></Header>
			<div className='animeList'>
				{savedAnime
					? Object.keys(savedAnime).map((keyName, i) => (
							<AnimeCard likedAnime={savedAnime[keyName]} />
					  ))
					: null}
			</div>
		</>
	);
}
