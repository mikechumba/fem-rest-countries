import Header from "./components/Header";


const app = Vue.createApp({
    template: `
        <nav-bar></nav-bar>
    `,
    data() {
        return {
            country: ''
        }
    },
    methods: {
        
    }
});

app.component('nav-bar', Header)

const vm = app.mount('#app');