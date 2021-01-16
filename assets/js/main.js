let app = new Vue ({
    el: "#app",
    data : {
        listMovies : [],
        listTvShows : [],
        search : "",
        searchNow: "",
        pageMovies : 1,
        pageTvShows : 1,
        totalpagesMovies : '',
        totalpagesTvShows : '',
        letters : ["a","b","c","d","e","f","g","h","i","l","m","n","k","j","o","p","q","r","s","t","u","v","z","y","x"],
        showSearchActive : false,
    },
    methods : {
        searchMoviesTvShowsInput(){
            this.pageMovies = 1;
            this.pageTvShows = 1;
            this.search = this.searchNow;
            this.searchMoviesTvShows();
            this.scrollReset();
            this.searchNow = "";
        },
        searchMoviesTvShows(){

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-IT&query=${this.search}&page=${this.pageMovies}&include_adult=false`)

            .then(response => {
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

            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-It&query=${this.search}&page=${this.pageTvShows}&include_adult=false`)

            .then(response => {
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
            const scrollMovie = this.$refs.movieContainer;
            scrollMovie.scrollLeft = 0;
            }
        },
        arrowLeftMovies(){
            if(this.pageMovies > 1){
            this.pageMovies--;
            this.searchMoviesTvShows();
            const scrollMovie = this.$refs.movieContainer;
            const widthMovie = scrollMovie.scrollWidth;
            scrollMovie.scrollLeft = widthMovie;
            }
        },
        arrowRightTvShows(){
            if(this.pageTvShows != this.totalpagesTvShows){
            this.pageTvShows++;
            const scrolltvShow= this.$refs.tvShowContainer;
            scrolltvShow.scrollLeft = 0;
            this.searchMoviesTvShows();
            }
        },
        arrowLeftTvShows(){
            if(this.pageTvShows > 1){
            this.pageTvShows--;
            const scrolltvShow= this.$refs.tvShowContainer;
            const widthtvShow = scrolltvShow.scrollWidth;
            scrolltvShow.scrollLeft = widthtvShow ;
            this.searchMoviesTvShows();
            }
        },
        reloadPage(){
            location.reload();
            this.scrollReset();
        },
        //Per visualizzare l'input e renderlo focus 
        showSearchAtive(){
            this.showSearchActive =! this.showSearchActive;
            const input = this.$refs.inputTextSearch;
            input.focus();
            if(this.showSearchActive == false){
                this.searchNow = '';
            }
        },
        scrollReset(){
            const scrollMovie = this.$refs.movieContainer;
            scrollMovie.scrollLeft = 0;
            const scrolltvShow= this.$refs.tvShowContainer;
            scrolltvShow.scrollLeft = 0;
        }
        
    },
    // Random
    mounted (){
        let randomLetter = this.letters[Math.floor(Math.random() * this.letters.length)];
        this.search = randomLetter;
        this.searchMoviesTvShows();
        this.searchNow = this.search;
        this.searchNow = "";
    }
});