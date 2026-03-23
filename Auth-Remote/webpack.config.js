const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    publicPath: "http://localhost:3001/",
    crossOriginLoading: "anonymous",
  },

  // react / react-dom resolve to window.React / window.ReactDOM (provided by the host).
  // This guarantees a single React instance when running federated inside the host.
  // For standalone mode, src/index.js seeds these globals via the `real-react` alias below.
  externals: {
    "react":            "React",
    "react-dom":        "ReactDOM",
    "react-dom/client": "ReactDOM",
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      webSocketURL: "ws://localhost:3001/ws",
    },
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      // These aliases bypass the externals above so index.js can import the
      // real packages from node_modules to seed window.React in standalone mode.
      "real-react":     path.resolve(__dirname, "node_modules/react"),
      "real-react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [require.resolve("@babel/preset-env"), {
                targets: { browsers: ["last 2 versions"] },
              }],
              [require.resolve("@babel/preset-react"), {
                runtime: "automatic",
              }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "AuthRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./Login":          "./src/exposes/Login",
        "./Signup":         "./src/exposes/Signup",
        "./ForgotPassword": "./src/exposes/ForgotPassword",
      },
      shared: {},
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
  ],
};