const tests = require('./foo.json');
const DFA = require("./dfa.js");
const NFA = require("./nfa.js");
const assert = require('assert');
const dfaTest = tests.filter(test => test.type == "dfa")
const nfaTest = tests.filter(test => test.type == "nfa")

describe("Running All Tests", function () {
    dfaTest.forEach(test => {
        describe(test.name, function () {
            it("pass-cases", function () {
                test["pass-cases"].forEach(string => {
                    let dfa = new DFA(test.tuple);
                    assert.ok(dfa.doesAccept(string));
                });
            });
            it("fail-cases", function () {
                test["fail-cases"].forEach(string => {
                    let dfa = new DFA(test.tuple);
                    assert.ok(!dfa.doesAccept(string));
                })
            });
        });
    });
    nfaTest.forEach(test => {
        describe(test.name, function () {
            it("pass-cases", function () {
                test["pass-cases"].forEach(string => {
                    let nfa = new NFA(test.tuple);
                    assert.ok(nfa.doesAccept(string));
                });
            });
            it("fail-cases", function () {
                test["fail-cases"].forEach(string => {
                    let nfa = new NFA(test.tuple);
                    assert.ok(!nfa.doesAccept(string));
                })
            });
        });
    });
});