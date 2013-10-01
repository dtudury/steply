/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/26/13
 * Time: 2:46 PM
 */

var Steply = require('../index');
var FS = require('fs');

console.log(process.cwd());

Steply('package.json').nodeNoErr(FS.exists).log('package.json exists')
    .args('package.json').node(FS.stat).log('package.json stats')
    .args('README.md').exec().log('README.md stats')
    .node(FS.stat, 'index.js').log('index.js stats');