import React from "react";
import { Typography, Spin, Rate } from "antd";
import "./card.css";
import { format } from "date-fns";
import { GenresConsumer } from "../genres-context";

const { Text } = Typography;

function Card({ loading, movieList, setRating }) {
  return movieList.map((movie) => {
    return (
      <div className="card" key={movie.id}>
        {loading ? <Spin style={{ alignSelf: "center" }} /> : null}
        {!loading ? <ViewItem movie={movie} setRating={setRating} /> : null}
      </div>
    );
  });
}

const ViewItem = ({ movie, setRating }) => {
  const sliceOverwiew = (str) => {
    const arr = str.split(" ");
    if (arr.length <= 25) {
      return str;
    }
    return arr.slice(0, 25).join(" ") + "...";
  };

  const dataFormat = (movie) => {
    if ("release_date" in movie && movie.release_date !== "") {
      return format(new Date(movie.release_date), "d MMMM, y");
    } else {
      return null;
    }
  };

  const viewGenres = (allGenres, genresID) => {
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

  const ratingColor = () => {
    if (movie.vote_average <= 3) {
      return "#E90000";
    } else if (movie.vote_average > 3 && movie.vote_average <= 5) {
      return "#E97E00";
    } else if (movie.vote_average > 5 && movie.vote_average <= 7) {
      return "#E9D100";
    } else {
      return "#66E900";
    }
  };

  return (
    <GenresConsumer>
      {(genres) => (
        <React.Fragment>
          <img
            className="card-img"
            src={`${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`}
            alt="картинка"
          />
          <div className="card-content">
            <div className="horizontal">
              <h3 style={{ marginBottom: 0 }}>{movie.title}</h3>
              <div
                className="rating"
                style={{ border: `2px solid ${ratingColor()}` }}
              >
                <Text strong>{movie.vote_average}</Text>
              </div>
            </div>

            <Text type="secondary">{dataFormat(movie)}</Text>
            <div className="wrapper">
              {viewGenres(genres, movie.genre_ids).map((genre, index) => {
                return (
                  <Text code key={index}>
                    {genre}
                  </Text>
                );
              })}
            </div>

            <p className="description">{sliceOverwiew(movie.overview)}</p>
            <Rate
              allowHalf
              count={10}
              value={JSON.parse(localStorage.getItem(`${movie.id}`))}
              onChange={(e) => {
                setRating(movie, e);
              }}
            />
          </div>
        </React.Fragment>
      )}
    </GenresConsumer>
  );
};

export default Card;
