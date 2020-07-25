const path = require('path');

module.exports = async ({ config, mode }) => {
    const TS_CONFIG_PATH = path.join(__dirname, '..', 'tsconfig.json')

    config.module.rules.push({
        test: /\.stories\.tsx?$/,
        loaders: [
            {
                loader: require.resolve('@storybook/source-loader'),
                options: {
                    parser: 'typescript'
                },
            },
            {
                loader: "react-docgen-typescript-loader",
                options: {
                    tsconfigPath: TS_CONFIG_PATH,
                },
            }
        ],
        enforce: 'pre',
    });

    config.module.rules.push({
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
            configFileName: TS_CONFIG_PATH,
        },
        exclude: [
            /node_modules/,
            /public/,
            /test\.(ts|tsx)$/,
        ]
    });

    return config;
};