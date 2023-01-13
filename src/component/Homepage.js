import React from 'react';
import AnimeCard from './AnimeCard';

export default function homepage({
	HandleSearch,
	search,
	setSearch,
	animeList,
	random,
	setRandom,
	firebaseAnime,
	SetFirebaseAnime,
}) {
	return (
		<>
			<main>
				<div className='searchContainer'>
					<form onSubmit={HandleSearch} className='searchForm'>
						<label htmlFor='Search Anime'></label>
						<input
							type='search'
							placeholder='Search Anime and Mangas'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</form>
				</div>
				{search ? (
					<div className='searchResults'>
						<h3>Search Results</h3>
						<div className='animeList'>
							{animeList.map((anime) => (
								<AnimeCard
									anime={anime}
									key={anime.mal_id}
									firebaseAnime={firebaseAnime}
									SetFirebaseAnime={SetFirebaseAnime}
								/>
							))}
						</div>
					</div>
				) : (
					<div className='randomHome'>
						<h3>Animes You Should Check Out</h3>
						<div className='animeList'>
							{random.map((anime) => (
								<AnimeCard
									anime={anime}
									key={anime.mal_id}
									firebaseAnime={firebaseAnime}
									SetFirebaseAnime={SetFirebaseAnime}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</>
	);
}
