export default class MovieService {
  _host = "https://api.themoviedb.org/3";
  _imageUrl = "https://image.tmdb.org/t/p/original";
  _apiKey = "7e27df8729bb32dddb2676b9ee36e97f";
  getResource = async (url) => {
    const res = await fetch(`${this._host}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getPopularMovie = async () => {
    const res = await this.getResource(
      `/movie/popular?api_key=${this._apiKey}&language=en-US&page=1`
    );
    return res.results;
  };

  getSearchMovie = async (query, page = 1) => {
    const res = await this.getResource(
      `/search/movie?api_key=${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    return res;
  };

  getGenres = async () => {
    const res = await this.getResource(
      `/genre/movie/list?api_key=${this._apiKey}&language=en-US`
    );
    return res.genres;
  };
}
