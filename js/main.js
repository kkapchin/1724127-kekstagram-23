
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

getRandomInt(1, 10);
checkStrLength('строка', 5);
