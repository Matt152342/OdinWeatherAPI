import path from "node:path";
import HtmlWepackPlugin from "html-webpack-plugin";

export default {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    plugin: [
        new HtmlWepackPlugin({
            template: "./src/index.html",
        }),
    ],
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }
    ]
};