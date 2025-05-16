import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import ignore from 'rollup-plugin-ignore';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: false, // Cambiado a false para eliminar sourcemaps
      },
      {
        file: 'dist/index.min.js',
        format: 'esm',
        sourcemap: false, // Cambiado a false para eliminar sourcemaps
        plugins: [terser()],
      }
    ],
    plugins: [
      ignore(['src/test/*']),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  }
];