const CountryDetails = {
    template: `
        <div>
            <div>
                <router-link to="/">
                    <button>Back</button>
                </router-link>
            </div>
            <div>
                <div>
                    <img src="" alt="countryflag">
                </div>
                <div>
                    <div>
                        <h4>Belgium</h4>
                        <div>
                            <ul class="">
                                <li>
                                    <b>Native Name:</b>
                                </li>
                                <li>
                                    <b>Population:</b>
                                </li>
                                <li>
                                    <b>Region:</b>
                                </li>
                                <li>
                                    <b>Sub Region:</b>
                                </li>
                                <li>
                                    <b>Capital:</b>
                                </li>
                            </ul>
                            <ul class="">
                                <li>
                                    <b>Top Level Domain:</b>
                                </li>
                                <li>
                                    <b>Currencies:</b>
                                </li>
                                <li>
                                    <span>Languages:</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5>Border Countries</h5>
                            <div>
                                <router-link to="/details/002">
                                    <button>France</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {

    }
}

export default CountryDetails;