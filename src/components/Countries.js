const Card = {
    template: `
        <div class="card">
            <div class="flag">
                <img src="" alt="countryFlag">
            </div>
            <div class="summary">
                <h5>Germany</h5>
                <ul>
                    <li>
                        <b>Population:</b>
                    </li>
                    <li>
                        <b>Region:</b>
                    </li>
                    <li>
                        <b>Capital:</b>
                    </li>
                </ul>
            </div>
        </div>
    `
};

const SearchForm = {
    template: `
        <div>
            <form action="">
                <div>
                    <input type="text" name="searchParam" id="searchParam">
                </div>
                <div>
                    <select name="region" id="">
                        <option value="" selected>Filter By Region</option>
                    </select>
                </div>
            </form>
        </div>
    `
}

const Countries = {
    components: {
        'card': Card,
        'search-form': SearchForm
    },
    template: `
        <div>
            <search-form></search-form>
            <card></card>
        </div>
        
    `
}

export default Countries;