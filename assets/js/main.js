let app = new Vue ({
    el: "#app",
    data : {
        listMovies : [],
        search : "",
        page : 1,
        totalpages : ''
    },
    methods : {
        searchMoviesInput(){
            this.page = 1;
            this.searchMovies();
        },
        searchMovies(){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-IT&page= ${this.page} &include_adult=false&query= ${this.search}`)
            .then(response => {
                console.log(response.data);
                let movies = response.data.results;
                this.listMovies = movies;
                this.totalpages = response.data.total_pages;
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
            })
        },
        arrowRight(){
            if(this.page != this.totalpages){
            this.page++;
            this.searchMovies();
            }
        },
        arrowLeft(){
            if(this.page > 1){
            this.page--;
            this.searchMovies();
            }
        }
    }
});