const getStatiscs = (winTitle, combos = []) => {
  const sections = winTitle.split('|').map(s => s.replace(/\[|\]/g, '').trim());
  return {
    total: +sections[1].split('/')[1],
	bad: parseInt(sections[4], 10),
	usernames: combos.split('\n').map(combo => combo.split(':')[0])
  };
};

module.exports = { getStatiscs };