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