<template>
    <div class="Dashboard">
        <ul class="collection with-header">
            <li class="collection-header"><h3>My articles</h3></li>
            <li v-for="myArticle in myArticles" :key="myArticle.id" class="collection.item">
                <div class="chip">{{myArticle.article_id}}</div>{{myArticle.title}}<br>{{myArticle.content}}
            </li>
            
        </ul>
        <button @click="deteleArticle" class="btn btn-danger">Delete</button>
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from  './firebaseInit'

export default {
    name: 'dashboard',
    data() {
        return {
            myArticles: [],
        }
    },
    created () {
        // db.collection('news').get().then
        // (querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //         console.log(doc.data())
        //     })
        // })
        this.fetchData();  
    },

    methods: {
        fetchData(){
            let docRef = db.collection("news");
            docRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => { 
                    // console.log(doc.data());
                    const data = {
                        'id': doc.id,
                        'article_id': doc.data().article_id,
                        'content': doc.data().content,
                        'title': doc.data().title
                    }
                    this.myArticles.push(data)
                })
            })
        },

        deteleArticle() {
            if(confirm('Are you sure?')){
                let docRef = db.collection("news");
            docRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => { 
                    // console.log(doc.data());
                    doc.ref.delete()
                    this.$router.push('/')
                })
            })
            }
        }
    }
} 
</script>