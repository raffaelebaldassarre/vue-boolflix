let app = new Vue ({
    el: "#app",
    data : {
        listMovies : [],
        listTvShows : [],
        search : "",
        pageMovies : 1,
        pageTvShows : 1,
        totalpagesMovies : '',
        totalpagesTvShows : ''
    },
    methods : {
        searchMoviesTvShowsInput(){
            this.pageMovies = 1;
            this.pageTvShows = 1;
            this.searchMoviesTvShows();
        },
        searchMoviesTvShows(){
         
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-IT&page=${this.pageMovies}&include_adult=false&query=${this.search}`)

            .then(response => {
                //console.log(response);
                console.log(response.data.results);
                let movies = response.data.results;
                this.listMovies = movies;
                this.totalpagesMovies = response.data.total_pages;
                movies.forEach(movie => {
                    let score = Math.ceil(movie.vote_average / 2);
                    movie.vote_average = score;
                    if (movie.original_language == "en"){
                        movie.original_language = "gb";
                      } else if (movie.original_language == "zh") {
                        movie.original_language = "cn"
                      } else if (movie.original_language == "ko") {
                        movie.original_language = "kr"
                      } else if(movie.original_language == "vi"){
                        movie.original_language = "vn";
                      }else if(movie.original_language == "et"){
                        movie.original_language = "ee";
                      }else if(movie.original_language == "ja"){
                        movie.original_language = "jp";
                      }else if(movie.original_language == "da"){
                        movie.original_language = "dk";
                      } else if(movie.original_language == "hu"){
                        movie.original_language = "ua";
                      }
                });
            }),

            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-It&page=${this.pageTvShows}&include_adult=false&query=${this.search}`)

            .then(response => {
                console.log(response.data.results);
                let tvShows = response.data.results;
                this.listTvShows = tvShows;
                this.totalpagesTvShows = response.data.total_pages;
                tvShows.forEach(tvShow => {
                    let score = Math.ceil(tvShow.vote_average / 2);
                    tvShow.vote_average = score;
                    if (tvShow.original_language == "en"){
                        tvShow.original_language = "gb";
                      } else if (tvShow.original_language == "zh") {
                        tvShow.original_language = "cn"
                      } else if (tvShow.original_language == "ko") {
                        tvShow.original_language = "kr"
                      } else if(tvShow.original_language == "vi"){
                        tvShow.original_language = "vn";
                      }else if(tvShow.original_language == "et"){
                        tvShow.original_language = "ee";
                      }else if(tvShow.original_language == "ja"){
                        tvShow.original_language = "jp";
                      }else if(tvShow.original_language == "da"){
                        tvShow.original_language = "dk";
                      } else if(tvShow.original_language == "hu"){
                        tvShow.original_language = "ua";
                      }
                });
            });
        },
        arrowRightMovies(){
            if(this.pageMovies != this.totalpagesMovies){
            this.pageMovies++;
            this.searchMoviesTvShows();
            }
        },
        arrowLeftMovies(){
            if(this.pageMovies > 1){
            this.pageMovies--;
            this.searchMoviesTvShows();
            }
        },
        arrowRightTvShows(){
            if(this.pageTvShows != this.totalpagesTvShows){
            this.pageTvShows++;
            this.searchMoviesTvShows();
            }
        },
        arrowLeftTvShows(){
            if(this.pageTvShows > 1){
            this.pageTvShows--;
            this.searchMoviesTvShows();
            }
        }
    }
});
    