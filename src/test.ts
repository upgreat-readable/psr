console.log(123);
let a = [1, 2, 3, 4, 5]

for (let i in a) {
    console.log('сейчас ключ  =-' + i);
    for (let j in a) {
        if (i !== j) {

            console.log('и я работаю с ключами ---  ' + j);
        }
    }
}
