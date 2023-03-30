import axios from 'axios';
const key = '288a182a80da5541ecf44f51511bfee2';
const BASIC_URL = 'https://api.themoviedb.org/3';

async function downloadGenresIdList() {
  return await axios(
    `${BASIC_URL}/genre/movie/list?api_key=288a182a80da5541ecf44f51511bfee2`
  ).then(({ data }) => {
    return data.genres;
  });
}

async function fetchSearch() {
  return await axios(
    `${BASIC_URL}/trending/movie/week?api_key=${key}&page=2`
  ).then(({ data }) => data);
}

function createGenres(genre_ids, genresIdList) {
  switch (genre_ids.length) {
    case 1:
      return findGenreByID(genre_ids[0], genresIdList);
    case 2:
      return `${findGenreByID(genre_ids[0], genresIdList)}, ${findGenreByID(
        genre_ids[1],
        genresIdList
      )}`;
      break;

    default:
      return `${findGenreByID(genre_ids[0], genresIdList)}, ${findGenreByID(
        genre_ids[1],
        genresIdList
      )}, Other`;
  }
}

function findGenreByID(id, genresIdList) {
  const genre = genresIdList.find(el => el.id === id);
  return genre.name;
}

async function getCardData() {
  const genresIdList = await downloadGenresIdList();
  const { results } = await fetchSearch();
  results.map(({ title, backdrop_path, genre_ids }) => {
    const fullBackdrop_path = BASIC_URL + backdrop_path;
    const generes = createGenres(genre_ids, genresIdList);
    console.log(fullBackdrop_path, title, generes);
    return { fullBackdrop_path, title, generes };
  });
}
getCardData();
