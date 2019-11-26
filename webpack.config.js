var path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/containers/SelfHelp/SelfHelp.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'SelfHelp.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
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
    },

};