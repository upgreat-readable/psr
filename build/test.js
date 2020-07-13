"use strict";
console.log(123);
var a = [1, 2, 3, 4, 5];
for (var i in a) {
    console.log('сейчас ключ  =-' + i);
    for (var j in a) {
        if (i !== j) {
            console.log('и я работаю с ключами ---  ' + j);
        }
    }
}
