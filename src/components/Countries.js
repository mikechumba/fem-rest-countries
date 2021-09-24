import { regions, numberWithCommas, KEY_CODES } from "../utils";

const Card = {
    props: ['country'],
    template: `
        <div class="card">
            <router-link :to="'/details/' + country.alpha3Code">
                <div class="flag">
                    <img :src="country.flags[0]" :alt="country.name + ' flag'">
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
    emits: ['filterByRegion', 'searchCountry'],
    template: `
        <div>
            <form>
                <div class="search-field">
                    <label class="sr-only" for="country-search">Search For Country</label>
                    <svg aria-labelledby="search-icon" role="img" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                        <title id="search-icon">Search Icon</title>
                        <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
                    </svg>
                    <input @keydown="$emit('searchCountry', $event.target.value)" id="country-search" type="text" name="searchParam" placeholder="Search for a country">
                </div>
                <ul class="custom-select">
                    <li id="dropdown-label" class="sr-only">Select Region</li>
                    <li ref="selected" @click="toggleVisibility" @keydown="toggleVisibility" tabindex="0" role="button" aria-labelledby="dropdown-label" class="selected">
                        <span>Filter by Region</span>
                        <svg role="img" aria-labelledby="dropdownIcon" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <title id="dropdownIcon">Click or press enter to show dropdown</title>
                            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                        </svg>
                    </li>
                    <li ref="list" :aria-expanded="!dropdownHidden">
                        <ul class="dropdown" :class="{ hidden: dropdownHidden }" role="listbox">
                            <li @keydown="onKeyDown" @click="setSelected($event); toggleDropdown()" class="dropdown-item" tabindex="0" v-for="(region, index) in regions" :id="'dropdownItem' + (index + 1)" :ref="'dropdownItem' + (index + 1)" role="option">{{ region }}</li>
                        </ul>
                    </li>
                </ul>
            </form>
        </div>
    `,
    data() {
        return {
            regions,
            dropdownHidden: true
        }
    },
    mounted() {
        document.documentElement.addEventListener('click', e => {
            if (!['dropdown', 'selected'].includes(e.target.className)) {
                this.dropdownHidden = true;
            }
        });
    },
    deactivated() {
        document.documentElement.removeEventListener('click');
    },
    methods: {
        toggleVisibility(e) {
            const { esc, enter, arrowDown, arrowUp } = KEY_CODES;
            if (e.type === 'click' || KEY_CODES.spacebar.includes(e.keyCode)) {
                this.toggleDropdown();
            } else if (e.keyCode === KEY_CODES.esc) {
                this.dropdownHidden = true;
            } else if ([esc, enter, arrowDown, arrowUp].includes(e.keyCode)) {
                this.onKeyDown(e);
            }
        }, 
        onKeyDown(e) {
            switch (e.keyCode) {
                case KEY_CODES.enter:
                    this.setSelected(e);
                    this.toggleDropdown();
                    return;
                case KEY_CODES.arrowDown:
                    e.preventDefault();
                    this.nextItem(e);
                    return;
                case KEY_CODES.arrowUp:
                    e.preventDefault();
                    this.nextItem(e);
                    return;
                case KEY_CODES.esc:
                    this.dropdownHidden === true;
                    return;
                default:
                    return;
            }
        },
        setSelected(e) {
            if (e.target.className !== 'selected') {
                this.$refs.selected.firstChild.textContent = e.target.textContent;
                this.$emit('filterByRegion', e.target.textContent);
            }
        },
        nextItem(e) {
            if (e.keyCode === KEY_CODES.arrowDown) {
                if (e.target.className === 'selected') {
                    this.dropdownHidden = false;
                    this.$refs.dropdownItem1.focus();
                } else {
                    const nextElement = e.target.nextSibling;
                    if (nextElement.id && nextElement.id.includes('dropdownItem')) {
                        this.$refs[nextElement.id].focus();
                    } else {
                        this.$refs.dropdownItem1.focus();   
                    }
                    
                }
            } else if (e.keyCode === KEY_CODES.arrowUp) {
                if (e.target.className === 'selected') {
                    this.dropdownHidden = true;
                } else {
                    const previousElement = e.target.previousSibling;
                    if (previousElement.id && previousElement.id.includes('dropdownItem')) {
                        this.$refs[previousElement.id].focus();
                    } else {
                        this.dropdownHidden = true;
                        this.$refs.selected.focus();   
                    }
                    
                }
            }
            
        },
        toggleDropdown() {
            this.dropdownHidden = !this.dropdownHidden;
        }
    }
}

const Countries = {
    props: ['countries'],
    components: {
        'card': Card,
        'search-form': SearchForm
    },
    template: `
        <div class="page">
            <search-form @filterByRegion="filterByRegion" @searchCountry="searchCountry"></search-form>
            <div class="country-list">
                <card v-if="filteredCountries.length" v-for="country in filteredCountries.slice(0, lastIndex)" :country="country"></card>
            
                <div v-if="!countries.length" v-for="skeleton in Array(8)" class="card">
                    <div class="skeleton skeleton-img">
                    </div>
                    <div class="summary">
                        <p class="skeleton skeleton-text"></p>
                        <div>
                            <p class="skeleton skeleton-text"></p>
                            <p class="skeleton skeleton-text"></p>
                            <p class="skeleton skeleton-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
    `,
    data() {
        return {
            filteredCountries: [],
            lastIndex: 8
        }
    },
    mounted() {
        this.getNext();
        this.getInitialCountries();
    },
    updated() {
        this.getInitialCountries();
    },
    methods: {
        filterByRegion(region) {
            this.filteredCountries = region !== 'All' ? 
                this.countries.filter(country => country.continent === region) :
                this.countries;
            this.lastIndex = 8;
        },

        searchCountry(param) {
            this.filteredCountries = param && param.length > 2 ?
                this.countries.filter(country => country.name.toLowerCase().startsWith(param.toLowerCase())) :
                this.countries;

            this.lastIndex = 8;
        }, 

        getNext() {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    this.lastIndex += this.lastIndex;
                }
            }
        },

        getInitialCountries() {
            if (!this.filteredCountries.length && this.countries.length) {
                this.filteredCountries = this.countries;
            }
        }
    }
}

export default Countries;