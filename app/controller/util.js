module.exports =  {
  toThousands: function(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  },
  splitPhone: function(num) {
    var res = [];
    var s = (num||'').toString();
    s = s.split('').reverse();
    for(let i = 1; i <= s.length; i++) {
      if(i%4==0){
        res.push(' ' + s[i-1]);
      } else {
        res.push(s[i-1]);
      }
    }
    return res.reverse().join('');
  }
}