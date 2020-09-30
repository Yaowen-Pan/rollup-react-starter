import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import alias from 'rollup-plugin-alias'
import postcss from 'rollup-plugin-postcss'
import image from 'rollup-plugin-img'
// import { terser } from 'rollup-plugin-terser'
// import { uglify } from 'rollup-plugin-uglify'
const path = require('path')

const input = 'src/index.js'
const output = 'dist/index'

export default [
    {
        input: input,
        output: {
            file: `${output}.js`,
            format: 'es'
        },
        plugins: [
            image({
                // output: `${path.resolve(__dirname, './dist')}`, // default the root
                extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
                // limit: 8192, // default 8192(8k)
                exclude: 'node_modules/**'
            }),
            alias({
                resolve: ['.jsx', '.js', '.less', '.jpg', '.png'],
                entries: [
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, './src')
                    }
                ]
            }),
            postcss({
                extract: true,
                // minimize: true,
                // sourceMap: true
                extensions: ['.less', '.css']
            }),
            resolve({
                browser: true
            }),
            commonjs({
                include: ['node_modules/**'],
                namedExports: {
                    'react-dom': ['createPortal']
                }
            }),
            babel({
                exclude: 'node_modules/**'
            }),
            external()
            // uglify(),
            // terser()
        ],
        external: ['react', 'react-dom', 'react-is']
    }
]
