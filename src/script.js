import CountryDetails from "./components/CountryDetails";
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

app.component('nav-bar', Header);
app.component('country-details', CountryDetails);

const vm = app.mount('#app');