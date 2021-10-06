// const express = require('express');
// const app = express();
// const vision = require('@google-cloud/vision');
// // Creates a client
// const client = new vision.ImageAnnotatorClient({
//     keyFilename: 'APIKey.json'
// });

// // Performs label detection on the image file
// client
//     .labelDetection('./IMG_20191214_155013.jpg')
//     .then(results => {
//         const labels = results[0].labelAnnotations;
//         let descriptionTags = [];
//         console.log('Labels:');
//         labels.forEach(label => descriptionTags.push(label.description));
//         console.log(descriptionTags);
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });

// app.listen(5000, '127.0.0.1', () => console.log('Server running'));

const vision = require('@google-cloud/vision');
const server = require('./lib/server');

const client = new vision.ImageAnnotatorClient({
    keyFilename: 'APIKey.json'
});

const app = {}

app.init = () => {
    client
        .labelDetection('./IMG_20191214_155013.jpg')
        .then(results => {
            const labels = results[0].labelAnnotations;
            let descriptionTags = [];
            console.log('Labels:');
            labels.forEach(label => descriptionTags.push(label.description));
            console.log(descriptionTags);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    // paruosti reikiamus direktorijas

    // paruosti reikiamus failus

    // inicijuojame serveri
    server.init();
}

app.init();

module.exports = app;