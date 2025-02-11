import path from 'path';
import { merge } from 'webpack-merge'; 
import common from './webpack.common.js'; 

export default merge(common, {
    output: {
        filename: 'bundle.modern.js', 
    },
    module: { 
        rules:  [
            {
                test: /\.js$/, // Con esta exprecion regular se le aplica a todos los archivos acabados con .js
                exclude: /node_modules/, // Excluye a los archivos de node_modules
                use: {
                    loader: 'babel-loader', // Se usa babel para transpilar el código
                }
            },
        ],
    },
});