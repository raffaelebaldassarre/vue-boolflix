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
            this.searchNow = "";
        },
        searchMoviesTvShows(){

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-IT&query=${this.search}&page=${this.pageMovies}&include_adult=false`)

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

            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=96b520e0dc8d25cbd0b85efba9d39c81&language=it-It&query=${this.search}&page=${this.pageTvShows}&include_adult=false`)

            .then(response => {
                //console.log(response.data.results);
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
        },
        reloadPage(){
            location.reload();
        },
        //Per visualizzare l'input e renderlo focus 
        showSearchAtive() {
            this.showSearchActive =! this.showSearchActive;
            const input = this.$refs.inputTextSearch;
            this.$refs.inputTextSearch.focus(input);
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



// bandiere:['ab','aa','af','ak','sq','am','ar','an','hy','as','av','ae','ay','az','bm','ba','eu','be','bn','bh','bi','bs','br','bg','my','ca','km','ch','ce','ny','zh','cu','cv','kw','co','cr','hr','cs','da','dv','nl','dz','en','eo','et','ee','fo','fj','fi','fr','ff','gd','gl','lg','ka','de','ki','el','kl','gn','gu','ht','ha','he','hz','hi','ho','hu','is','io','ig','id','ia','ie','iu','ik','ga','it','ja','jv','kn','kr','ks','kk','rw','kv','kg','ko','kj','ku','ky','lo','la','lv','lb','li','ln','lt','lu','mk','mg','ms','ml','mt','gv','mi','mr','mh','ro','mn','na','nv','nd','ng','ne','se','no','nb','nn','ii','oc','oj','or','om','os','pi','pa','ps','fa','pl','pt','qu','rm','rn','ru','sm','sg','sa','sc','sr','sn','sd','si','sk','sl','so','st','nr','es','su','sw','ss','sv','tl','ty','tg','ta','tt','te','th','bo','ti','to','ts','tn','tr','tk','tw','ug','uk','ur','uz','ve','vi','vo','wa','cy','fy','wo','xh','yi','yo','za','zu']