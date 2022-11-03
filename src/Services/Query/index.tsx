import axios from 'Services/Axios';

export const Query = async (key: string, { params = { _limit: 20 } }: any) => {
  const url = `https://heroku-fake-rest-api.herokuapp.com/${key}/`;
  return await axios.get(url, { params });
};

export default Query;
