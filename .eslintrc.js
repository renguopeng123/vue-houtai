module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    //此项是用来指定javaScript语言类型和风格
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    //全局变量
    env: {
        //下面的配置指定是否为浏览器环境
        browser: true,
        node: true,
        es6: true,
    },
    // 此项是用来配置标准的js风格，就是说写代码的规范
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    // 下面这些rules是用来设置从插件来的规范代码的规则
    rules: {
        "vue/max-attributes-per-line": [2, {
            "singleline": 10,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/name-property-casing": ["error", "PascalCase"],
        "vue/no-v-html": "off",
        'accessor-pairs': 2,
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        'block-spacing': [2, 'always'],
        'camelcase': [0, {
            'properties': 'always'
        }],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        'curly': [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eqeqeq': ["error", "always", {
            "null": "ignore"
        }],
        'generator-star-spacing': [2, {
            'before': true,
            'after': true
        }],
        'handle-callback-err': [2, '^(err|error)$'],
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false
        }],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        //eslint规定直接使用console.log("");是会报错的,这里关闭no-console错误
        'no-console': 'off',
        //关闭缩进，否则需要严格按照缩进规则
        'no-tabs': 'off',
        //不进行缩进校验
        'indent': 'off',
        // 'indent': [2, 2, {
        //     'SwitchCase': 1
        // }],
        //函数名之前的空格
        'no-spaced-func': 'off',
        // 'no-spaced-func': 2,
        //结尾需要换行符
        'eol-last': "off",
        // 'eol-last': 2,
        // 注解之后是否必须要空格
        'spaced-comment': "off",
        // 'spaced-comment': [2, 'always', {
        //     'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        // }],
        //不允许一次超过多少空行
        'no-multiple-empty-lines': "off",
        // 'no-multiple-empty-lines': [2, {
        //     'max': 1
        // }],
        //不允许结尾空格
        'no-trailing-spaces': "off",
        // 'no-trailing-spaces': 2,
        //不允许定义的变量在后面的代码中没有被使用到
        'no-unused-vars': "off",
        // 'no-unused-vars': [2, {
        //     'vars': 'all',
        //     'args': 'none'
        // }],
        //规定对象字面量中大括号内是否允许加空格，也适用于ES6中的结构赋值和模块import和export
        'object-curly-spacing': "off",
        // 'object-curly-spacing': [2, 'always', {
        //     objectsInObjects: false
        // }],
        // if while function 后面的{必须与if在同一行，java风格。 
        'brace-style': "off",
        // 'brace-style': [2, '1tbs', {
        //     'allowSingleLine': true
        // }],
        //块不能用空行填充
        'padded-blocks': "off",
        // 'padded-blocks': [2, 'never'],
        //字符串必须用单引号
        'quotes': 'off',
        // 'quotes': [2, 'single', {
        //     'avoidEscape': true,
        //     'allowTemplateLiterals': true
        // }],
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
        }],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-undef': 2,
        'no-undef-init': 2,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [2, {
            'defaultAssignment': false
        }],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [2, {
            'initialized': 'never'
        }],
        'operator-linebreak': [2, 'after', {
            'overrides': {
                '?': 'before',
                ':': 'before'
            }
        }],
        'semi': [2, 'never'],
        'semi-spacing': [2, {
            'before': false,
            'after': true
        }],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        'yoda': [2, 'never'],
        'prefer-const': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'array-bracket-spacing': [2, 'never']
    }
}