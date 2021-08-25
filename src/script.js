import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Header from "./components/Header";

const app = Vue.createApp({
    template: `
        <nav-bar></nav-bar>
        <countries></countries>
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
app.component('countries', Countries)

const vm = app.mount('#app');