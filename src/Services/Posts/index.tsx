import axios from 'Services/Axios'

export const Posts = async (key: string, { params = { _limit: 20 } }: any) => {
    const url = `https://heroku-fake-rest-api.herokuapp.com/posts/`
    return await axios.get(url, { params })
}

export default Posts