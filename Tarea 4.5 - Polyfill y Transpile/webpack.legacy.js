import path from 'path';
import { merge } from 'webpack-merge'; // Permite combinar archivos entre webpack.common y el .legacy
import common from './webpack.common.js'; 

export default merge(common, {
    output: {
        filename: 'bundle.legacy.js',
    },
    module: { 
        rules:  [
            {
                test: /\.js$/, 
                exclude: /node_modules/, // Excluye a los archivos de node_modules
                use: {
                    loader: 'babel-loader', // Usa babel para transpilar el código.
                }
            },
        ],
    },
});