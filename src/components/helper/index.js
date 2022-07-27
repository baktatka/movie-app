import { format } from "date-fns";

export const sliceOverwiew = (str) => {
  const arr = str.split(" ");
  if (arr.length <= 25) {
    return str;
  }
  return arr.slice(0, 25).join(" ") + "...";
};

export const dataFormat = (movie) => {
  if ("release_date" in movie && movie.release_date !== "") {
    return format(new Date(movie.release_date), "d MMMM, y");
  } else {
    return null;
  }
};

export const viewGenres = (allGenres, genresID) => {
  let arr = [];
  genresID.forEach((id) =>
    allGenres.forEach((obj) => {
      if (obj.id === id) {
        arr.push(obj.name);
      }
    })
  );
  return arr;
};

export const ratingColor = (average) => {
  if (average <= 3) {
    return "rating-red";
  } else if (average > 3 && average <= 5) {
    return "rating-orange";
  } else if (average > 5 && average <= 7) {
    return "rating-yellow";
  } else {
    return "rating-green";
  }
};

export const viewImage = (poster) => {
  if (poster === null) {
    return "https://warshistory.ru/800/600/https/zipbenzo.ru/image/placeholder.jpg";
  } else {
    return `${"https://image.tmdb.org/t/p/original"}${poster}`;
  }
};
