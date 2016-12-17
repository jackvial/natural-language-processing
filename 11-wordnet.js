let natural = require('natural');
let wordnet = new natural.WordNet();
let myWord = 'desert';

wordnet.lookup(myWord, results => {
    results.forEach(result => {
        console.log('\n');
        console.log(result.synsetOffset);
        console.log(result.pos);
        console.log(result.synonyms);
        console.log(result.gloss);
    });
});

wordnet.get(2590182, 'v', (resut) => {
    console.log('resut: ', resut);
});