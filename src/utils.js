export const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All'];

export const numberWithCommas = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}

export const listWithCommas = (list, key = 'name') => {
    return list ? list.map(item => item[key]).join(', ') : '';
}

export const KEY_CODES = {
    spacebar:[0,32],
    enter: 13,
    arrowDown: 40,
    arrowUp: 38,
    esc: 27,
}