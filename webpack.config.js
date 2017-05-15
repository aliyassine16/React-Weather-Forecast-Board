module.exports = {
    entry: "./built/Board.js",
    output: {
        path: __dirname,
        filename: "index.js"
    },
    module: {
        loaders: []
    }
};