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
	}, [likedAnime]);

	const handleClick = (e) => {
		//checks if the title is in the anime

		if (anime) {
			if (savedAnime === null) {
				pushFirebase();
				getFirebaseData();
				setLikeStatus(false);
			}
			if (anime.title in savedAnime) {
				//if it is in, remove it
				removeFirebase(anime.title);
			} else {
				//otherwise push it

				pushFirebase();
				getFirebaseData();
				setLikeStatus(false);
			}
		}

		if (likedAnime) {
			removeFirebase(likedAnime.engTitle);
		}
	};
	//gets data from reference and saves it
	// issues here
	const getFirebaseData = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/`);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();

			setSavedAnime(data);
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
	};

	const removeFirebase = (animeName) => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}/${animeName}`);
		remove(dbRef);
		setLikeStatus(true);
		let newList = Object.values(savedAnime).filter((anime) => {
			return anime.engTitle !== animeName;
		});
		setSavedAnime(newList);
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
					<button onClick={(e) => handleClick(e)}>Add to list</button>
				) : (
					<button onClick={(e) => handleClick(e)}>Remove from List</button>
				)
			) : null}
		</article>
	);
};
export default AnimeCard;
