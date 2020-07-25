import * as React from 'react'
import axios from 'axios'
import get from 'lodash/get'

export const usePosts = () => {
    const [ loading, setLoading ] = React.useState(false)
    const [ error, setError ] = React.useState(false)
    const [ data, setData ] = React.useState(false)

    React.useEffect(() => {
        const onSuccess = (response: any) => {
            setLoading(false)
            const data = get(response, 'data', [])
            setData(data)
        }

        const onError = () => {
            setError(true)
            setLoading(false)
        }

        const url = `https://heroku-fake-rest-api.herokuapp.com/posts/`
        setLoading(true)
        axios.get(url, { params: { _limit: 20 }})
            .then(onSuccess)
            .catch(onError)
    }, [])

    return { loading, error, data }
}