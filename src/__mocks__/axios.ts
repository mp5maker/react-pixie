import { AxiosResponse } from 'axios'

const axiosResponse: AxiosResponse = {
    data: [],
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
};

const instance = {
    create: jest.fn(function(options) {
        // @ts-ignore
        return this;
    }),
    default: {
        get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
    },
    get: jest.fn(()  => Promise.resolve(axiosResponse))
}

export default instance