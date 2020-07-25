import axios from 'Services/Axios'

export const Posts = async ({ params = { _limit: 20 } }: any) => {
    const url = `https://heroku-fake-rest-api.herokuapp.com/posts/`
    const response = await axios.get(url, { params })
    return response
}

export default Posts