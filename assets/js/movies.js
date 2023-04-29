import { createElement, createStyle, createMarkup, moviesList, addMoviesToList, inputSearch, clearMoviesMarkup, triggerMode } from "./dom.js";

let searchLast = null;
const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((data) => data.Search);

const debounceTime = (() => {
  let timer = null;

  return (callback, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(callback, ms);
  };
})();



const inputSearchHandler = (e) => {
  debounceTime(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      if (!triggerMode) clearMoviesMarkup(moviesList);

      getData(`http://www.omdbapi.com/?apikey=90d85ed3&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => addMoviesToList(movie)))
        .catch((error) => console.log(error));
    }

    searchLast = searchString;
  }, 2000)
};

export const appInit = () => {
  createStyle();
  createMarkup();
  inputSearch.addEventListener('input', inputSearchHandler);
};
