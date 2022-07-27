import axios from "axios";

axios.defaults.baseURL= 'https://pixabay.com/api';
const KEY = '27783872-f200130df473948fa8b794bc2'

export const fetchImages = async (query, currentPage) => {
    const { data } = await axios.get(
      `/?q=${query}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    );
  
    return data;
  };

