import React, { useState, useEffect } from 'react';
import AnimeCard from './AnimeCard';

const Main = () => {
	// sets anime list
	const [animeList, setAnimeList] = useState([]);
	//sets top animes to display on sidebar
	const [topAnime, setTopAnime] = useState([]);
	//sets search function
	const [search, setSearch] = useState('');
	//sets random animes to display on homepage
	const [random, setRandom] = useState([]);

	//async/await function to display to top 5 animes by popularity
	const GetTopAnime = async () => {
		try {
			const response = await fetch(
				'https://api.jikan.moe/v4/top/anime?filter=bypopularit&page=1'
			);
			//returns json data
			const topAnime = await response.json();
			//slices the data so it only shows the top 5
			setTopAnime(topAnime.data.slice(0, 5));
		} catch (error) {
			alert(error);
		}
	};

	//handles the Search function
	const HandleSearch = (e) => {
		//prevents default of form
		e.preventDefault();
		//searches anime title
		if (search) {
			SearchAnime(search);
		} else {
			alert('Please enter an anime to search');
		}
	};

	const SearchAnime = async (query) => {
		//error handling for api call
		try {
			//api call for a query
			const response = await fetch(
				`https://api.jikan.moe/v4/anime?q=${query}&limit=20&order_by=title&sort=acs`
			);
			const animeQuery = await response.json();
			setAnimeList(animeQuery.data);
		} catch (error) {
			alert(error);
		}
	};

	const SearchRandom = async () => {
		//sets an empty array to append to
		const animeArray = [];
		//since api only returns
		while (animeArray.length < 9) {
			const response = await fetch('https://api.jikan.moe/v4/random/anime');
			const animeQuery = await response.json();
			animeArray.push(animeQuery.data);
		}
		setRandom(animeArray);
	};
	useEffect(() => {
		SearchRandom();
		GetTopAnime();
	}, []);

	return (
		<>
			<div className='content'>
				<aside>
					<nav>
						<h2>Top Anime</h2>
						{topAnime.map((anime) => (
							<a
								href={anime.url}
								target='_blank'
								rel='noreferrer'
								key={anime.mal_id}
							>
								{anime.title}
							</a>
						))}
					</nav>
				</aside>
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
									<AnimeCard anime={anime} key={anime.mal_id} />
								))}
							</div>
						</div>
					) : (
						<div className='randomHome'>
							<h3>Animes You Should Check Out</h3>
							<div className='animeList'>
								{random.map((anime) => (
									<AnimeCard anime={anime} key={anime.mal_id} />
								))}
							</div>
						</div>
					)}
				</main>
			</div>
		</>
	);
};

export default Main;
