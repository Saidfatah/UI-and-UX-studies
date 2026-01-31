const arr = [1, 1, 2, 3, 4, 3, 3, 6, 5, 5];

const mappedArray = arr.reduce(function(p, c) {
  p[c] = (p[c] || 0) + 1;
  return p;
}, {});;

const sorted = arr.sort((a, b) => {
  // Sort by frequency (ascending)
  const freqDiff = mappedArray[a] - mappedArray[b];
  if (freqDiff !== 0) return -freqDiff;

  // If same frequency, sort by value (ascending)
  return -(a - b);
});

 


console.log(sorted);