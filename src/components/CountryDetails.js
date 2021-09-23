import { numberWithCommas, listWithCommas } from "../utils";

const CountryDetails = {
    props: ['countries'],
    template: `
        <div class="page">
            <div>
                <router-link to="/">
                    <button class="btn btn-previous">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
                        </svg>
                        Back
                    </button>
                </router-link>
            </div>
            <article v-if="country.name" class="country-details">
                <div class="flag">
                    <img :src="country.flags[1]" :alt="country.name + ' flag'">
                </div>
                <div class="country-description">
                    <h4>{{ country.name }}</h4>
                    <div class="description">
                        <ul>
                            <li>
                                <b>Native Name:</b> {{ country.name }}
                            </li>
                            <li>
                                <b>Population:</b> {{ numberWithCommas(country.population) }}
                            </li>
                            <li>
                                <b>Region:</b> {{ country.region }}
                            </li>
                            <li>
                                <b>Sub Region:</b> {{ country.subregion }}
                            </li>
                            <li>
                                <b>Capital:</b> {{ country.capital }}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <b>Top Level Domain:</b>
                                {{ listWithCommas(country.topLevelDomain) }}
                            </li>
                            <li>
                                <b>Currencies:</b>
                                {{ listWithCommas(country.currencies) }}
                            </li>
                            <li>
                                <b>Languages:</b>
                                {{ listWithCommas(country.languages) }}
                            </li>
                        </ul>
                    </div>
                    <div class="border-countries">
                        <h5>Border Countries:</h5>
                        <div>
                            <router-link v-for="border in country.borders" to="/details/002">
                                <button class="btn btn-group">{{ getCountryName(border) }}</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `,
    data() {
        return {
            country: {}
        }
    },
    mounted() {
        if (this.countries.length) this.getCountry();
    },
    updated() {
        this.getCountry();
    },
    methods: {
        getCountry() {
            this.country = this.countries.find(country => country.alpha3Code === this.$route.params.code);
        },

        getCountryName(alpha3Code) {
            return this.countries.find(country => country.alpha3Code === alpha3Code).name;
        },

        numberWithCommas,

        listWithCommas
    }
}

export default CountryDetails;