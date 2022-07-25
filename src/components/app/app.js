import Card from "../card";
import { Row, Input, Pagination, Tabs, Alert } from "antd";
import "./app.css";
import "antd/dist/antd.min.css";
import { debounce } from "lodash";
import { useState, useRef, useEffect } from "react";
import MovieService from "../../Service/movi-service";
import { GenresProvider } from "../genres-context";

function App() {
  const [movieList, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [rated, setRated] = useState([]);
  const [searchErr, setSearchErr] = useState(false);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(false);

  const { TabPane } = Tabs;

  useEffect(() => {
    async function fetchData() {
      new MovieService().getGenres().then((genres) => {
        setLoading(false);
        setGenres(genres);
      });
    }
    fetchData();
  }, []);

  const debounceSearch = useRef(
    debounce(async (value) => {
      setMovies(await searchMovie(value).then((data) => data.results));
      setTotalPages(
        await searchMovie(value).then((data) => data.total_results)
      );
      setLoading(false);
    }, 1500)
  ).current;

  async function handleChange(e) {
    debounceSearch(e.target.value);
    setQuery(e.target.value);
  }

  const searchMovie = async (e) => {
    setLoading(true);
    const res = await new MovieService().getSearchMovie(e).catch(onError);
    if (res.results.length === 0) {
      setSearchErr(true);
      setLoading(false);
    } else {
      setSearchErr(false);
      return res;
    }
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const nextPage = (pageNumber) => {
    new MovieService().getSearchMovie(query, pageNumber).then((data) => {
      setCurrentPage(pageNumber);
      setMovies(data.results);
    });
  };

  const setRating = (movie, e = 0) => {
    let items = JSON.parse(localStorage.getItem("rated"));
    if (items == null) items = [];
    if (rated.some((element) => element.id === movie.id)) {
      localStorage.setItem(`${movie.id}`, JSON.stringify(e));
      setRated((oldArr) => [...oldArr, movie]);
      return;
    }
    items.push(movie);
    localStorage.setItem("rated", JSON.stringify(items));
    localStorage.setItem(`${movie.id}`, JSON.stringify(e));
    setRated((oldArr) => [...oldArr, movie]);
  };

  const numberPages = Math.floor(totalPages / 20);
  let localRated = JSON.parse(localStorage.getItem("rated"));

  const alertError = error ? (
    <Alert message="Ошибка сервера" type="error" />
  ) : null;
  const searchNotFound = searchErr ? (
    <Alert message="Ничего не найдено" type="warning" />
  ) : null;
  const content =
    !searchErr && !error ? (
      <Card loading={loading} movieList={movieList} setRating={setRating} />
    ) : null;

  return (
    <div className="background">
      <div className="card-list">
        <GenresProvider value={genres}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Search" key="1">
              <Input
                type="search"
                placeholder="Type to search..."
                onChange={handleChange}
              />
              <div className="card-wrapper">
                {alertError}
                {searchNotFound}
                {content}
              </div>
              <Row type="flex" justify="center">
                {movieList.length <= 19 || searchErr || error ? null : (
                  <Pagination
                    size="small"
                    total={totalPages}
                    pageSize={numberPages}
                    current={currentPage}
                    onChange={(page) => nextPage(page)}
                    showSizeChanger={false}
                    style={{ marginTop: 36 }}
                  />
                )}
              </Row>
            </TabPane>
            <TabPane tab="Rated" key="2">
              <div className="card-wrapper">
                {localRated === null ? null : (
                  <Card
                    loading={loading}
                    movieList={localRated}
                    setRating={setRating}
                  />
                )}
              </div>
            </TabPane>
          </Tabs>
        </GenresProvider>
      </div>
    </div>
  );
}

export default App;
