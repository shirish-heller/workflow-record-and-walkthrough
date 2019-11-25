var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/containers/SelfHelp/SelfHelp.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'SelfHelp.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                    },
                  },
                ],
              },
        ]
    }
};