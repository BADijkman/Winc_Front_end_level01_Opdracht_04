const movieList = document.getElementById("movie-list");
const searchBar = document.getElementsByName("movie-filter");
const searchField = document.getElementById("searchField");

// get URL
const imdbURL = (id) => {
  return "http://www.imdb.com/title/" + id;
};

// add movies to the dom
const addMoviesToDom = (movies) => {
  let allMoviesLi = movies.map((movie) => {
    const newListItem = document.createElement("li");
    const newAnchor = document.createElement("a");
    const newImage = document.createElement("img");
    newListItem.classList.add("movie-list__listitem");
    newAnchor.href = imdbURL(movie.imdbID);
    newImage.src = movie.Poster;
    newAnchor.target = "blank";
    newListItem.appendChild(newAnchor);
    newAnchor.appendChild(newImage);
    return newListItem;
  });
  allMoviesLi.forEach((i) => {
    movieList.appendChild(i);
  });
};

addMoviesToDom(movies);

// remove all movies from the dom
const removeMoviesFromDom = () => {
  let listItems = document.getElementsByClassName("movie-list__listitem");
  let arrayListItems = Array.from(
    document.getElementsByClassName("movie-list__listitem")
  );
  arrayListItems.forEach((item) => {
    let removedItem = movieList.removeChild(listItems[0]);
  });
};

//add eventListerner to radio buttons
const addEventListeners = () => {
  searchBar.forEach((radioBtn) => {
    radioBtn.addEventListener("change", () => {
      handleOnChangeEvent(event);
    });
  });
};
addEventListeners();

// filterLatestMovies
const filterLatestMovies = () => {
  const result = movies.filter((movie) => {
    return parseInt(movie.Year) >= 2014;
  });
  addMoviesToDom(result);
};

// filterradioButtons
const handleOnChangeEvent = (event) => {
  switch (event.target.value) {
    case "all-movies":
      removeMoviesFromDom();
      addMoviesToDom(movies);
      break;
    case "new-movies":
      removeMoviesFromDom();
      filterLatestMovies();
      break;
    case "avenger-movies":
      removeMoviesFromDom();
      filterMovies("Avenger");
      break;
    case "xmen-movies":
      removeMoviesFromDom();
      filterMovies("X-Men");
      break;
    case "princess-movies":
      removeMoviesFromDom();
      filterMovies("Princess");
      break;
    case "batman-movies":
      removeMoviesFromDom();
      filterMovies("Batman");
      break;
    default:
      removeMoviesFromDom();
      addMoviesToDom(movies.Movies);
      break;
  }
};

const filterMovies = (wordInMovieTitle) => {
  const result = movies.filter((item) => {
    return item.Title.includes(wordInMovieTitle);
  });
  addMoviesToDom(result);
};

// searchField
searchField.addEventListener("keyup", () => {
  removeMoviesFromDom();
  filterMovies(
    searchField.value.charAt(0).toUpperCase() + searchField.value.slice(1)
  );
});
