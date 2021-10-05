const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'APIKey.json'
});

// Performs label detection on the image file
client
    .labelDetection('./IMG_20191214_155013.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label));
        //console.log(results);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });

app.listen(5000, '127.0.0.1', () => console.log('Server running'));