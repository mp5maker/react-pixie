import axios from 'axios'
import { Posts } from 'Services/Posts'

describe('Posts', () => {
    it('Calls axios and returns posts', async () => {
        // @ts-ignore
        axios.get.mockImplementationOnce((url, options) => Promise.resolve({
            data: [
                {
                    department: "ENERSAVE",
                    designation: "QUORDATE",
                    id: 1,
                    joining_date: "2014-07-10T04:50:36 -06:00",
                    name: "Strong Cain",
                }
            ],
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
        }))

        const response = await Posts({ params: { _limit: 20 } })

        expect(response).toStrictEqual({
            data: [
                {
                    department: "ENERSAVE",
                    designation: "QUORDATE",
                    id: 1,
                    joining_date: "2014-07-10T04:50:36 -06:00",
                    name: "Strong Cain",
                }
            ],
            status: 200,
            statusText: 'OK',
            config: {},
            headers: {},
        })

        expect(axios.get).toHaveBeenCalledTimes(1)
    })
})