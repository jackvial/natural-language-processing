'use strict';

let natural = require('natural');
let fs = require('fs');
//let classifier = new natural.LogisticRegressionClassifier();
let classifier = new natural.BayesClassifier();

fs.readFile('training_data.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('err: ', err);
    } else {
        let trainingData = JSON.parse(data);
        train(trainingData);
    }
});

function train(trainingData) {
    console.log('training....');
    trainingData.forEach(item => {
        classifier.addDocument(item.text, item.label);
    });
    let startTime = new Date();
    classifier.train();
    let endTime = new Date();
    let trainingTime = (endTime - startTime) / 1000.0;
    console.log('Training time: ', trainingTime, ' seconds');
    loadTestData();
}

function loadTestData() {
    console.log('Loading test data');
    fs.readFile('test_data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('err: ', err);
        } else {
            let testData = JSON.parse(data);
            testClassifier(testData);
        }
    });
}

function testClassifier(testData) {
    console.log('Testing classifier');
    let numCorrect = 0;
    testData.forEach(item => {
        let labelGuess = classifier.classify(item.text);
        if (labelGuess === item.label) {
            numCorrect++;
        }
    });
    console.log('Correct %: ', numCorrect / testData.length);
}