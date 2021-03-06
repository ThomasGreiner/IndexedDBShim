global.window = global;
window.location = {search: ''}; // useShim=true // This must go before sinon as well as before our test-environment.js.

window.chai = require('chai');
window.sinon = require('sinon');
window.mocha = {setup: function () {}, globals: function () {}, checkLeaks: function () {}};
window.assert = window.chai.assert;

window.addEventListener = function (type) {
    if (type !== 'cordovacallbackerror') {
        throw new Error('Event listener type added for dummy addEventListener placeholder: ' + type);
    }
    console.log('dummy window.addEventListener called');
};

window.onerror = function () {
    console.log('Node onerror called');
};

(function () {
    const setGlobalVars = require('../../dist/indexeddbshim-node.js');
    setGlobalVars();

    require('../../tests-mocha/test-environment.js');
    require('../../tests-mocha/test-utils.js');
    require('./setup.js');

    var tests; // eslint-disable-line no-var

    if (process.env.npm_config_test) {
        tests = [process.env.npm_config_test];
        console.log('Running test: ' + process.env.npm_config_test);
    } else {
        tests = [
            'database.js',
            'index.js',
            'keyrange.js',
            'objectstore.add.js',
            'objectstore.clear.js',
            'objectstore.count.js',
            'objectstore.delete.js',
            'objectstore.get.js',
            'objectstore.js',
            'objectstore.put.js',
            'transaction.js',
        ];
    }
    tests.forEach(function (path) {
        require('./' + path);
    });
}());
