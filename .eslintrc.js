module.exports = {
    'extends': [
        'airbnb',
        'airbnb/hooks',
    ],
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
        'react/jsx-filename-extension': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-array-index-key': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/prop-types': [
            'error', {
                'ignore': [
                    'navigation', 'focused',
                ],
            }
        ],
    },
    'overrides': [{
        'files': ['*.snap'],
        'rules': {
            'quotes': [
                'error', 'single',
                { 'allowTemplateLiterals': true }
            ]
        }
    }],
    'globals': {
        'fetch': false,
    },
};
