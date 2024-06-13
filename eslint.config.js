import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
        ignores: ['dist'],
    },
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            }
        }
    },
    {
        files: ['*.js'],
        extends: [tseslint.configs.disableTypeChecked],
    },
);
