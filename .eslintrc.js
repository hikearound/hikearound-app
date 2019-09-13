module.exports = {
    'extends': ['airbnb', 'airbnb/hooks']
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
        'react/no-array-index-key': 'off',
        'react/prop-types': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'comma-dangle': ['error', 'always-multiline'],
    },
    'globals': {
        'fetch': false,
    },
};
