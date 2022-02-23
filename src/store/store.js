import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        articles: [],
        searchResults:[]
    },
    getters: {
        articles(state){
            return state.articles
          
        }, 
        searchResults(state){
            return state.searchResults
            
        }
    },
    mutations: {
        updateNews(state, data) {
            state.articles = data;
            },
        searchResultNews(state, data){
            state.articles = data;
        }
    },
    actions: {
        async getNews(context,data) {
            // console.log(data);
            var baseUrl = 'http://newsapi.org/v2/top-headlines?apiKey=7071bce3ae434ff3837aa5de4c358584'
            data.forEach(element => {
                var countryName = Object.keys(element);
                var countryValue =  Object.values(element)
                // console.log(countryValue);
                baseUrl+=`&${countryName}=${countryValue}`
            });
            const response = await axios.get(baseUrl)
            // console.log(response.data.articles)
            context.commit('updateNews', response.data.articles)
            //  alert(baseUrl)
        },
        async searchNews(context, keyword) {
            // console.log(`Searching word: ${keyword}`);
            var newsUrl = 'http://newsapi.org/v2/everything?apiKey=7071bce3ae434ff3837aa5de4c358584';
            if(keyword){
                newsUrl+=`&q=${keyword}`
            }
            
            const response = await axios.get(newsUrl);
            context.commit('searchResultNews', response.data.articles)
            // console.log(response);
                    
        }
    }
})