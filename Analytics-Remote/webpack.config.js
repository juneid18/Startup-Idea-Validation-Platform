const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    mode: argv.mode || "development",
    entry: "./src/index.js",

    output: {
      publicPath: "auto",
      crossOriginLoading: "anonymous",
    },

    // ──────────────────────────────────────────────────────────
    // Externalize React to the Host's Window Globals
    // This is the "Nuclear Fixed" strategy to guarantee absolute 
    // singleton React when dynamic loading into Next.js.
    // ──────────────────────────────────────────────────────────
    externals: {
      "react":            "React",
      "react-dom":        "ReactDOM",
      "react-dom/client": "ReactDOM",
    },

    devServer: {
      port: 3002,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
    },

    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        // Alias for seeding the globals in standalone mode
        "real-react": path.resolve(__dirname, "node_modules/react"),
        "real-react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
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
        name: "analytics_remote",
        filename: "remoteEntry.js",
        exposes: {
          "./Dashboard": "./src/exposes/Analytics",
        },
        // We rely on Externals for React, so shared is empty for react.
        // Recharts can stay shared or just be bundled. 
        // Bundling it ensures its internal peer-deps 
        // resolve to our external React via webpack externals above.
        shared: {},
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "https://startup-idea-validation-platform.onrender.com"),
      }),
    ],
  };
};
