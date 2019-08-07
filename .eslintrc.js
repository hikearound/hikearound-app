module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        }
    },
    'env': {
        'jest': true,
        'react-native/react-native': true,
    },
    'plugins': [
        'react',
        'react-native',
    ],
    'rules': {
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'import/no-extraneous-dependencies': 'off',
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'comma-dangle': ['error', 'always-multiline'],
    },
    'globals': {
        'fetch': false
    },
}
