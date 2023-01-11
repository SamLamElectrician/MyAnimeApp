import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { getDatabase, push, ref, set } from 'firebase/database';
import firebaseConfig from '../firebase';
import { useState } from 'react';

const AnimeCard = ({ anime }) => {
	let { user } = useUserAuth();
	const [pushIds, setPushIds] = useState([]);
	const [likeStatus, setLikeStatus] = useState(true);
	//takes data from Main api call to return a card

	const handleClick = () => {
		if (pushIds) {
			pushFirebase();
			setPushIds([...pushIds]);
		}
		//saves the push id
	};

	const pushFirebase = () => {
		const db = getDatabase(firebaseConfig);
		const dbRef = ref(db, `user/${user.uid}`);
		const newPost = push(dbRef);

		const newItemRef = set(newPost, {
			link: anime.url,
			japtitle: anime.title_japanese,
			engTitle: anime.title,
			img: anime.images.jpg.large_image_url,
			plot: anime.synopsis,
		});
		const newItemKey = newItemRef.key;
		console.log(pushIds);
		pushIds.push(newItemKey);
		setLikeStatus(false);
	};

	// const removeFirebase = () => {
	// get(ref(db, `${user.uid}`)).then((data) => {
	// 	remove(db, `${user.id}` + data);
	// });
	// ref(db, `user/${user.uid}`).remove({
	// 	link: anime.url,
	// 	japtitle: anime.title_japanese,
	// 	engTitle: anime.title,
	// 	img: anime.images.jpg.large_image_url,
	// 	plot: anime.synopsis,
	// });
	// 	setLikeStatus(true);
	// 	var nodeRef = database.ref('items').child(pushId);

	// 	// Remove the node
	// 	nodeRef
	// 		.remove()
	// 		.then(function () {
	// 			console.log('Remove succeeded.');
	// 		})
	// 		.catch(function (error) {
	// 			console.log('Remove failed: ' + error.message);
	// 		});
	// };

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
