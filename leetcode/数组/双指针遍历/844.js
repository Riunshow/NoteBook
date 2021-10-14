/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  var c = (s, a = []) => {
    for (var i = 0; i < s.length; i++) {
      s[i] === '#' ? a.pop() : a.push(s[i])
    }
    return a.join('')
  }
  return c(S) === c(T)
};

backspaceCompare('ab#c', 'ad#c')