import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import commonjs from 'rollup-plugin-commonjs';
export default {
  input: './front-xss/index.js',
  output: {
    file: './dist/xss.min.js',
    format: 'iife',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.json'],
    }),
    babel({
	    extensions: [".js", ".ts"],
	    exclude: "node_modules/**",
	    runtimeHelpers: true
  	}),
  	uglify(),
  	commonjs()
  ],
}