<template>
    <div class="new-article">
        <h2>New Article</h2>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="article_id">
                <label>Artical ID</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="title">
                <label>Title</label>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="content">
                <label>Content</label>
            </div>
        </div>
        <button @click="saveArticle" type="submit" class="btn green">Submit</button>
        <router-link to="'/" class="btn grey">Cancel</router-link>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'new-article',
    data() {
        return {
            article_id: null,
            title: null,
            content: null
        }
    },
    methods: {
        saveArticle() {
            db.collection('news').add({
                article_id: this.article_id,
                title: this.title,
                content: this.content
            })
            .then(docRef => 
                this.$router.push('/dashboard')
            )
        }
    }
}
</script>
