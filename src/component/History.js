import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';

export default function History() {
	const { user, savedAnime } = useUserAuth();

	return (
		<div className='animeList'>
			{animeList.map((anime) => (
				<AnimeCard
					anime={anime}
					key={anime.mal_id}
					savedAnime={savedAnime}
					setSavedAnime={setSavedAnime}
				/>
			))}
		</div>
	);
}
