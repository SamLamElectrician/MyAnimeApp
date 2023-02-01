import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import firebaseConfig from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';

const AnimeCard = ({ anime, likedAnime }) => {
	let { user, setSavedAnime, savedAnime } = useUserAuth();
	const [likeStatus, setLikeStatus] = useState(true);

	useEffect(() => {
		if (likedAnime) {
			setLikeStatus(false);
		}
	}, []);

	const handleClick = () => {
		//checks if the title is in the anime
		// || likedAnime.engTitle in savedAnime
		if (anime && anime.title in savedAnime) {
			//if it is in, remove it
			removeFirebase(anime.title);
		} else {
			//otherwise push it
			pushFirebase();
			getFirebaseData();
			setLikeStatus(false);
		}
		if (likedAnime && likedAnime.engTitle in savedAnime) {
			removeFirebase(likedAnime.engTitle);
		} else {
			pushFirebase();
			getFirebaseData();
			setLikeStatus(false);
		}
	};
	//gets data from reference and saves it
	// issues here
	const getFirebaseData = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/`);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			// console.log('snapshot:', data);
			setSavedAnime(data);
		});
	};
	//pushes data as anime title with anime info as sub node
	const pushFirebase = () => {
		const db = getDatabase(firebaseConfig);
		//saves anime title as node in firebase
		if (anime) {
			const dbRef = ref(db, `user/${user.uid}/${anime.title}`);
			const newItemRef = set(dbRef, {
				link: anime.url,
				japtitle: anime.title_japanese,
				engTitle: anime.title,
				img: anime.images.jpg.large_image_url,
				plot: anime.synopsis,
			});
		}
		if (likedAnime) {
			const dbRef = ref(db, `user/${user.uid}/${likedAnime.engTitle}`);
			const newItemRef = set(dbRef, {
				link: anime.url,
				japtitle: anime.title_japanese,
				engTitle: anime.title,
				img: anime.images.jpg.large_image_url,
				plot: anime.synopsis,
			});
		}
	};

	const removeFirebase = (animeName) => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/${anime.title}`);
		remove(dbRef);
	};

	//takes data from Main api call to return a card
	return (
		// <div>{anime ? anime.url : likedAnime.plot}</div>
		<article className='animeCard'>
			<a
				href={anime ? anime.url : likedAnime.link}
				target='_blank'
				rel='noreferrer'
			>
				<figure>
					<img
						src={anime ? anime.images.jpg.large_image_url : likedAnime.img}
						alt='anime'
					/>
				</figure>
				<div className='info'>
					<h3>
						{anime ? anime.title : likedAnime.engTitle} ||<br></br>{' '}
						{anime ? anime.title_japanese : likedAnime.japtitle}
					</h3>
					<p>{anime ? anime.synopsis : likedAnime.plot}</p>
				</div>
			</a>
			{user ? (
				likeStatus ? (
					<button onClick={() => handleClick()}>Add to list</button>
				) : (
					<button onClick={() => handleClick()}>Remove from List</button>
				)
			) : null}
			{/* <Button anime={anime}> Add to List</Button> */}
			{user ? user.email : 'user it not here'}
		</article>
	);
};

export default AnimeCard;
