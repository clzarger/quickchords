'use strict';
var ugs = require('ultimate-guitar-scraper');

const promisify = func => new Promise((resolve, reject) => {
    func((error, result) => {
        if (error) reject(error)
        else resolve(result)
    });
});

module.exports.getSong = async event => {
    // just in case
    console.log('query params:', event.queryStringParameters);

    var name = event.queryStringParameters.name;
    var artist = event.queryStringParameters.artist;

    var query = {
        query: name,
        type: ['Chords']
    };

    const searchPromise = () => new Promise((resolve, reject) => {
        ugs.search(query, function (searchError, tabs, response, body) {
            if (searchError) {
                console.log("Issue on ugs search");
                reject(searchError);
            } else {
                const tabFilteredByArtist = tabs.filter(hi => hi.artist === artist);
                const tabSortedByBest = tabFilteredByArtist.sort((a, b) => (a.rating < b.rating ? 1 : -1));
                const tabUrl = tabSortedByBest[0]['url'];
                ugs.get(tabUrl, function (getError, tab) {
                    if (getError) {
                        console.log("Issue on ugs get");
                        reject(getError);
                    } else {
                        resolve(tab);
                    }
                });
            }
        });
    });

    try {
        const result = await searchPromise();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    }

};
