import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import firebaseConfig from '../firebase';
import { useState } from 'react';

const AnimeCard = ({ anime, setSavedAnime, savedAnime }) => {
	let { user } = useUserAuth();

	const [likeStatus, setLikeStatus] = useState(true);
	//takes data from Main api call to return a card

	const handleClick = () => {
		//checks if the title is in the anime
		if (anime.title in savedAnime) {
			//if it is in, remove it
			removeFirebase();
		} else {
			//otherwise push it
			pushFirebase();
			getFirebaseData();
		}

		console.log('saved:', savedAnime);
	};
	//gets data from reference and saves it
	// issues here
	const getFirebaseData = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/`);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			// console.log('snapshot:', data);
			setSavedAnime(...savedAnime, data);
		});
	};
	//pushes data as anime title with anime info as sub node
	const pushFirebase = () => {
		const db = getDatabase(firebaseConfig);
		//saves anime title as node in firebase
		const dbRef = ref(db, `user/${user.uid}/${anime.title}`);
		const newItemRef = set(dbRef, {
			link: anime.url,
			japtitle: anime.title_japanese,
			engTitle: anime.title,
			img: anime.images.jpg.large_image_url,
			plot: anime.synopsis,
		});

		setLikeStatus(false);
	};

	const removeFirebase = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/${anime.title}`);
		remove(dbRef);
	};

	//takes data from Main api call to return a card
	return (
		<article className='animeCard'>
			<a href={anime.url} target='_blank' rel='noreferrer'>
				<figure>
					<img src={anime.images.jpg.large_image_url} alt='anime' />
				</figure>
				<div className='info'>
					<h3>
						{anime.title} ||<br></br> {anime.title_japanese}
					</h3>
					<p>{anime.synopsis}</p>
				</div>
			</a>
			{likeStatus ? (
				<button onClick={() => handleClick()}>Add to list</button>
			) : (
				<button onClick={() => handleClick()}>Remove from List</button>
			)}
			{/* <Button anime={anime}> Add to List</Button> */}
			{user ? user.email : 'user it not here'}
		</article>
	);
};

export default AnimeCard;
