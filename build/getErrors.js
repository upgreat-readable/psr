"use strict";
// @ts-ignore
var path = require("path");
// @ts-ignore
var fs = require("fs");
// @ts-ignore
var requestPromise = require('request-promise');
// @ts-ignore
console.log('Нзвание файла:', path.basename(__filename));
// @ts-ignore
var filePath = path.join(__dirname, 'mistakes', 'mistakes.json');
var options = {
    method: 'GET',
    uri: 'https://catalog-errors.readable.w6p.ru/errors/all'
};
requestPromise(options)
    .then(function (response) {
    console.log(response, 'response');
    // @ts-ignore
    fs.writeFile(filePath, response, function (err) {
        if (err) {
            console.log(err, 'err creation file');
        }
        else {
            console.log('Файл mistakes создан');
        }
    });
})
    .catch(function (err) {
    console.log(err, 'err');
});
