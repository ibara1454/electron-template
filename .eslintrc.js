module.exports = {
    'extends': ['eslint:recommended', 'google'],
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'globals': {
        'console': false,
        'window': false,
        'process': false,
        'require': false,
        '__dirname': false,
    },
    'rules': {
        'no-console': 'off',
        'comma-dangle': 0
    },
    "env": {
        "browser": true,
        "node": true
    }
};
