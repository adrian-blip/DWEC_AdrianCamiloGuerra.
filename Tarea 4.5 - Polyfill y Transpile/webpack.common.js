import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {   
    entry: './src/script.js',
    output: {
        path: path.resolve(process.cwd(), 'compilado', process.env.modo),
        filename: 'bundle.js',
 
    },
    mode: process.env.modo, // Modo que queremos que compile.

    // Plugin para copiar archivos HTML con Webpack.
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/index.html', to: '.' }, // Copia el index.html al directorio base (development o production)
            ],
        }),
    ],
}