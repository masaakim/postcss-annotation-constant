var parse = require('css-annotation').parse

module.exports = function plugin (css, options) {
    options = options || {}

    var annotations = parse(css)

    return function (root) {
        var constRules = []

        root.eachRule(function (node) {
            annotations.forEach(function (annotation) {
                if (annotation.rule === node.selector && checkConstant(node)) {
                    constRules.push(node.selector)
                }
            })
        })

        root.eachRule(function (node) {
            constRules.forEach(function (constRule) {
                if (node.selector === constRule && !checkConstant(node)) {
                    var err = new Error('postcss-const: Cannot cascade ' + '`' + constRule + '`')
                    throw err
                }
            })
        })

        return root
    }
}

function checkConstant (node) {
    if (node.childs) {
        var children = node.childs
        var text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@constant\strue/)) return true
    }
    return false
}
