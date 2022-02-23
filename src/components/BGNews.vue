<template>
  <div class="news">
    <b-container class="container-news">
      <b-nav-form class="searchbar">
          <b-form-input v-model="keyword" id="name" size="md" class="mr-sm-2 searchbar-input" placeholder="Search"></b-form-input>
          <b-button @click.prevent="search()" size="md" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
    </b-container>

  <div class="result-list">
    <article v-for="(article, index) in news" :key='index' @click="navTo(article.url)">
      <header>
        <img v-if="article.urlToImage" :src="article.urlToImage" alt="">
      </header>
      <section v-html="article.title" class="article-title"></section>
    </article>
  </div>

  <!-- <div>
     <article v-for="(article, index) in searchedNews" :key='index' @click="navTo(article.url)">
      <header>
        <img v-if="article.urlToImage" :src="article.urlToImage" alt="">
      </header>
      <section v-html="article.title" class="article-title"></section>
    </article>
  </div> -->

  <news-paginated
					:data="news"

					:per-page="4"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>
         <!-- :total-pages="Math.ceil(searchResults.length / 4)" -->
         <!-- :total="searchResults.length" -->
  </div>
</template>




<script>
import axios from 'axios'
import NewsPaginated from './NewsPaginated.vue'
import { mapGetters, mapActions } from 'vuex'



export default {
  data: () => {
    return {
      apiUrl: '',
      currentPage: 1,
      totalResults: 0,
      maxPerPage: 10,
      keyword: '',
      // articles: [],
      filters:[],
      country: 'bg',
    }
  },
  components: {
    NewsPaginated
  },
  mounted(){
  },

  methods: {
    onPageChange(page) {
      this.currentPage = page;
      //axios get url ? this.currentPage&offset=20&perPage=10
    },
    getAllNews() {
   },
    navTo(url){
      window.open(url)
    },
    search(){
      this.$store.dispatch('searchNews',this.keyword);
    },
    // onChangePage(pageOfItems) {
    //         // update page of items
    //         this.pageOfItems = pageOfItems;
    //         console.log(pageOfItems);
    // }

  },


  created(){
    // this.fetchNews();
    const dynamicUrl = "";
    // var o = {
    //   key: 'value'
    // }
    this.filters.push( {'country' : this.country} )
    this.filters.push({'pageSize': this.maxPerPage})
    this.filters.push({'q': this.keyword})
    this.$store.dispatch('getNews',this.filters);



  },
  computed: {
    ...mapGetters(['searchResults']),
    news(){
          return this.$store.getters.articles;
        },
    searchedNews(){
      return this.$store.getters.searchResults
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-news {
  position: relative;
}
.searchbar {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  width: 100%;
}
.searchbar-input {
  padding: 0 50px 0 50px;
  margin: 0;
  width: calc(100% - 100px);
}

.result-list {
  padding-top: 54px;
}

article {
  display: grid;
  grid-template-columns: 400px 600px;
  grid-template-rows: 250px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;
}
header {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  overflow: hidden;
}
img {
  max-width: 550px;
  height: 400px;
}
.article-title{
  position: relative;
  width: 300px;
  margin: 0;
  padding: 10px;
  height: 100px;
}

.pagination {
      display: flex;
      justify-content: center;
      padding: 0;
      margin: auto 0 0 0;
      list-style-type: none;
}
.pagination-item button {
    margin: 0!important;
    padding: .25rem .5rem;
    font-size: 1.1rem;
    border: none;
    border-radius: .25rem;
    background: none;

}


/* &:hover
      cursor: pointer;
      background-color: silver;
    &[disabled="disabled"]
      color: silver;
      cursor: default;
      &:hover
        cursor: default
        background-color: transparent
    &.active
      color: red */
</style>
