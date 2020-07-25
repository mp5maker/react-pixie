import * as React from 'react'
import get from 'lodash/get'

import { Posts } from 'Services/Posts'

export const usePosts = ({ params }: any) => {
    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const fetchPost = async (params: any) => {
            const response = await Posts({ params })
            const data = get(response, 'data', [])
            setData(data)
            setLoading(false)
        }
        fetchPost(params)
    }, [])

    return {
        loading,
        data
    }
}