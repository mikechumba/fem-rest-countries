import Countries from "./components/Countries";
import Header from "./components/Header";

const url = 'https://restcountries.com/v2/all';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: Countries },
        { path: '/details/:code', component: () => import('./components/CountryDetails') }
    ]
})

const app = Vue.createApp({
    components: {
        'nav-bar': Header,
        'countries': Countries
    },
    template: `
        <header>
            <nav-bar></nav-bar>
        </header>
        <main>
            <router-view :countries="countries"></router-view>
        </main>
    `,
    data() {
        return {
            countries: []
        }
    },
    mounted() {
        this.getCountries();
    },
    methods: {
        getCountries() {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.countries = data
                })
                .catch(err => console.log(err));
        }
    }
});

app.use(router)

app.mount('#app');