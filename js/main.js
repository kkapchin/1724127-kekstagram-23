
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max <= 10) {
    if (min < max) {
      return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }
  return 'Invalid range. Input the numbers from 0 to 10.';
}

function checkStrLength(str, max) {
  return str.length <= max;
}

function getRandomFloat(min, max, quantity) {
  return (min < max) ? (Math.random() * (max - min + 1) + min).toFixed(quantity) : 'Invalid range.';
}

getRandomInt(1, 10);
checkStrLength('строка', 5);
getRandomFloat(-1.123123, 5.2323, 1);
