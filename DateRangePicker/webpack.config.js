module.exports = {
    // Other webpack config options...
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          }
        },
        // Other loaders as needed...
      ]
    },
    // Other webpack config options...
  };
  