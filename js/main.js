
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (min >= 0 && max > min) ?
    (Math.floor(Math.random() * (max - min + 1)) + min) :
    'Invalid range.';
}

function checkStrLength(str, max) {
  return str.length <= max;
}

function getRandomFloat(min, max, quantity) {
  return (min < max) ? (Math.random() * (max - min + 1) + min).toFixed(quantity) : 'Invalid range.';
}

getRandomInt(9, 15);
checkStrLength('строка', 5);
getRandomFloat(-1.123123, 5.2323, 1);
