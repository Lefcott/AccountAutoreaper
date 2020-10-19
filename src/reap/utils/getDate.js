/** @param {[string, string]} texts  */
exports.getDate = ([strTime, strDate]) => {
  const [hours, minutes] = strTime.split(':');
  const [day, month, year] = strDate.split('/');
  const date = new Date(year, month - 1, day, hours, minutes);
  return date.toString() === 'Invalid Date' ? null : date;
};
