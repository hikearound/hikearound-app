module.exports = {
    'extends': [
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'prettier/react',
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
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': [
                    '.js', '.jsx', '.ts', '.tsx'
                ],
            }
        }
    },
    'plugins': [
        'react',
        'react-native',
        'prettier',
    ],
    'rules': {
        'indent': [
            'error', 4,
            {
                'SwitchCase': 1
            },
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-filename-extension': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-array-index-key': 'off',
        'react/static-property-placement': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/prop-types': [
            'error', {
                'ignore': [
                    'navigation', 'focused',
                ],
            }
        ],
        'semi': ['error', 'always'],
        'prettier/prettier': [
            'error',
            {
                'trailingComma': 'all',
                'singleQuote': true,
                'jsxSingleQuote': true,
                'printWidth': 80,
                'semi': true,
                'jsxBracketSameLine': false,
                'tabWidth': 4,
                'arrowParens': 'always',
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
