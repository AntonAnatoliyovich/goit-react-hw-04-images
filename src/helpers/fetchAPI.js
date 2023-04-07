import axios from 'axios';

const API_KEY = '33686649-ba989947344a323365ef7e7ef';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchData = async (q, page) => {
    const response = await axios.get(`?q=${q}`, {
        params: {
            key: API_KEY,
            page,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
        },
    });

    return response.data;
};
