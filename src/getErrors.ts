// @ts-ignore
const path = require('path');
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const requestPromise = require('request-promise');

// @ts-ignore
console.log('Нзвание файла:', path.basename(__filename));
// @ts-ignore
const filePath = path.join(__dirname, 'mistakes', 'mistakes.json');

const options = {
    method: 'GET',
    uri: 'https://catalog-errors.readable.w6p.ru/errors/all',
};

requestPromise(options)
    .then(function (response: any) {
        console.log(response, 'response');
        // @ts-ignore
        fs.writeFile(filePath, response, err => {
            if (err) {
                console.log(err, 'err creation file');
            } else {
                console.log('Файл mistakes создан');
            }
        });
    })
    .catch(function (err: any) {
        console.log(err, 'err');
    });
