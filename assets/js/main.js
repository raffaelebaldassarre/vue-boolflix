let app = new Vue ({
    el: "#app",
    data : {
        listMovies : [],
        search : "",
        page : 1,
    },
    methods : {
        searchMovies (search){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-IT&page= ${this.page} &include_adult=false&query= ${search}`)
            .then(response => {
                console.log(response.data);
                let movies = response.data.results;
                this.listMovies = movies;
                movies.forEach(element => {
                    let score = Math.ceil(element.vote_average / 2);
                    element.vote_average = score;
                    
                });
            })
        }
    }
});