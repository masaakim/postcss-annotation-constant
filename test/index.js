var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var constant = require('..')

function fixture (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

test('throw error: Cannot cascade', function (t) {
    var res = function () {
        return postcss().use(constant(fixture('test-1'))).process(fixture('test-1')).css.trim()
    }
    t.throws(res, /Cannot cascade/)
    t.end()
})

test('no error', function (t) {
    var res = postcss().use(constant(fixture('test-2'))).process(fixture('test-2')).css.trim()
    t.same(res, fixture('test-2'))
    t.end()
})
