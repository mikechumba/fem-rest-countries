export const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

export const numberWithCommas = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}

export const listWithCommas = (list, key = 'name') => {
    return list ? list.map(item => item[key]).join(', ') : '';
}