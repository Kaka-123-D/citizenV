function checkNumberString(str) {
  for (i in str) {
    if (isNaN(parseInt(str[i]))) return false
  }
  return true;
}

module.exports = {checkNumberString};