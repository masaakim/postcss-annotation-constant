var parse = require('css-annotation').parse

module.exports = function plugin (css, options) {
    options = options || {}

    var annotations = parse(css)

    return function (root) {
        var constRules = []

        root.walkRules(function (node) {
            annotations.forEach(function (annotation) {
                if (annotation.rule === node.selector && checkConstant(node)) {
                    constRules.push(node.selector)
                }
            })
        })

        root.walkRules(function (node) {
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
    if (node.nodes) {
        var children = node.nodes
        var text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@constant/)) return true
    }
    return false
}
