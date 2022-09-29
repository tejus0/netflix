import axios from "axios"

/** base url to make requests to the movie database **/
const instance = axios.create({  // create instance is used when we have common path for our API's

    baseURL: "https://api.themoviedb.org/3",
    // baseURL: "https://image.tmdb.org/t/p/original",
});

export default instance;