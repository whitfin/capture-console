module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            files: [
                '.eslintrc.{js,cjs}'
            ]
        }
    ],
    globals: {
        suite: "readonly",
        test: "readonly"
    },
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ]
    }
};
