import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Header from "./components/Header";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: Countries },
        { path: '/details/:id', component: CountryDetails }
    ]
})

const app = Vue.createApp({
    components: {
        'nav-bar': Header,
        'country-details': CountryDetails,
        'countries': Countries
    },
    template: `
        <nav-bar></nav-bar>
        <router-view></router-view>  
    `,
    data() {
        return {
            country: ''
        }
    },
    methods: {
        
    }
});

app.use(router)

app.mount('#app');