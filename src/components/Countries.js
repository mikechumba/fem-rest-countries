import { regions, numberWithCommas } from "../utils";

const Card = {
    props: ['country'],
    template: `
        <div class="card">
            <router-link :to="'/details/' + country.alpha3Code">
                <div class="flag">
                    <img :src="country.flag" alt="countryFlag">
                </div>
                <div class="summary">
                    <h4>{{ country.name }}</h4>
                    <ul>
                        <li>
                            <b>Population:</b> {{ numberWithCommas(country.population) }}
                        </li>
                        <li>
                            <b>Region:</b> {{ country.region }}
                        </li>
                        <li>
                            <b>Capital:</b> {{ country.capital }}
                        </li>
                    </ul>
                </div>
            </router-link>
        </div>
    `,
    methods: {
        numberWithCommas
    }
};

const SearchForm = {
    emits: ['filterByRegion'],
    template: `
        <div>
            <form action="">
                <div class="search-field">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                        <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
                    </svg>
                    <input type="text" name="searchParam" placeholder="Search for a country" id="searchParam">
                </div>
                <div class="custom-select">
                    <div class="selected" @click="dropdownHidden = !dropdownHidden">
                        Filter by Region
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                        </svg>
                    </div>
                    <div class="dropdown" :class="{ hidden: dropdownHidden }">
                        <div class="dropdown-item" @click="$emit('filterByRegion', region), dropdownHidden = !dropdownHidden" v-for="region in regions">{{ region }}</div>
                    </div>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            regions,
            dropdownHidden: true
        }
    },
}

const Countries = {
    props: ['countries'],
    components: {
        'card': Card,
        'search-form': SearchForm
    },
    template: `
        <div class="page">
            <search-form @filterByRegion="filterByRegion"></search-form>
            <div class="country-list"> 
                <card v-if="filteredCountries.length" v-for="country in filteredCountries" :country="country"></card>
                <card v-if="!filteredCountries.length" v-for="country in countries" :country="country"></card>
            </div>
        </div>   
    `,
    data() {
        return {
            filteredCountries: []
        }
    },
    methods: {
        filterByRegion(region) {
            this.filteredCountries = this.countries.filter(country => country.region === region);
        }
    }
}

export default Countries;