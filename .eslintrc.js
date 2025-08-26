module.exports = {
    extends: ['airbnb', 'airbnb/hooks', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        jest: true,
        'react-native/react-native': true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
            alias: {
                map: [
                    ['@actions', './actions'],
                    ['@assets', './assets'],
                    ['@components', './components'],
                    ['@constants', './constants'],
                    ['@icons', './icons'],
                    ['@lib', './lib'],
                    ['@navigators', './navigators'],
                    ['@providers', './providers'],
                    ['@reducers', './reducers'],
                    ['@screens', './screens'],
                    ['@stacks', './stacks'],
                    ['@store', './store'],
                    ['@styles', './styles'],
                    ['@utils', './utils'],
                ],
            },
        },
    },
    plugins: ['react', 'react-native', 'prettier'],
    rules: {
        indent: 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-props-no-spreading': 'off',
        'lines-around-directive': 'off',
        'no-restricted-syntax': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-array-index-key': 'off',
        'func-names': 'off',
        'react/static-property-placement': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'comma-dangle': ['error', 'always-multiline'],
        'no-await-in-loop': 'off',
        'no-param-reassign': 'off',
        'global-require': 'off',
        'react/prop-types': [
            'error',
            {
                ignore: [
                    'navigation',
                    'focused',
                    'theme',
                    'route',
                    'scheme',
                    't',
                ],
            },
        ],
        semi: ['error', 'always'],
        'prettier/prettier': 'error',
    },
    overrides: [
        {
            files: ['*.snap'],
            rules: {
                quotes: ['error', 'single', { allowTemplateLiterals: true }],
            },
        },
    ],
    globals: {
        fetch: false,
    },
};
