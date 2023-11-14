const capcon = require('../');
const should = require('should');

suite('Capture Console', function () {

    test('capturing standard error', function () {
        let stderr1 = capcon.interceptStderr(function capture() { });

        let stderr2 = capcon.interceptStderr(function capture() {
            console.error('Aloha the first time!');
        });

        let stderr3 = capcon.interceptStderr(function capture() {
            console.error('Aloha the second time!');
        });

        should(stderr1).equal('');
        should(stderr2).equal('Aloha the first time!\n');
        should(stderr3).equal('Aloha the second time!\n');
    });

    test('capturing standard output', function () {
        let stdout1 = capcon.interceptStdout(function capture() {
            console.log('Aloha the first time!');
        });

        let stdout2 = capcon.interceptStdout(function capture() { });

        let stdout3 = capcon.interceptStdout(function capture() {
            console.log('Aloha the second time!');
        });

        should(stdout1).equal('Aloha the first time!\n');
        should(stdout2).equal('');
        should(stdout3).equal('Aloha the second time!\n');
    });

    test('capturing standard io', function () {
        let stdio1 = capcon.interceptStdio(function capture() {
            console.log('Aloha the first time!');
            console.error('Aloha the second time!');
        });

        let stdio2 = capcon.interceptStdio(function capture() { });

        let stdio3 = capcon.interceptStdio(function capture() {
            console.log('Aloha the third time!');
        });

        let stdio4 = capcon.interceptStdio(function capture() {
            console.error('Aloha the fourth time!');
        });

        let stdio5 = capcon.interceptStdio(function capture() {
            console.log('Aloha the fifth time!');
            console.error('Aloha the sixth time!');
        });

        should(stdio1).deepEqual({
            stdout: 'Aloha the first time!\n',
            stderr: 'Aloha the second time!\n'
        });

        should(stdio2).deepEqual({
            stdout: '',
            stderr: ''
        });

        should(stdio3).deepEqual({
            stdout: 'Aloha the third time!\n',
            stderr: ''
        });

        should(stdio4).deepEqual({
            stdout: '',
            stderr: 'Aloha the fourth time!\n'
        });

        should(stdio5).deepEqual({
            stdout: 'Aloha the fifth time!\n',
            stderr: 'Aloha the sixth time!\n'
        });
    });

});
