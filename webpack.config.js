
module.exports = {
    entry:{
        WeatherForecast: [            
            './js/Board.js'
        ]
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
             {
                test: /\.js$/,
                loaders: ['jsx-loader','babel-loader'], 
                exclude: /node_modules/
            }

        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [


      
    ]
};