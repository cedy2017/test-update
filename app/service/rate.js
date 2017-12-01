module.exports = app => {
  let rateArray = [{name: 'HKD', value: 1}, {name: 'CNY', value: 0.851}, {name: 'USD', value: 0.128}, {name: 'GBP', value: 0.0955}, {name: 'JPY', value: 14.395}];
  let prevTime = Date.now();
  class Rate extends app.Service {
    * get() {
      let result,
          currTime = Date.now();
      // 两小时更新一次。
      if ((currTime - prevTime) < 7200000) {
        return rateArray;
      }
      try {
        result = yield app.curl('http://www.apilayer.net/api/live?access_key=f4b3908bc2910a24bf21f1e7ae362a33&format=1', {
          dataType: 'json',
        });
        prevTime = currTime;
      } catch(e) {
        return rateArray;
      }
      
      result = result.data.quotes;
      let rateObj = {
        'USDHKD': null,
        'USDCNY': null,
        'USDGBP': null,
        'USDJPY': null
      };
      for(let key in rateObj) {
        rateObj[key] = result[key];
      }
      let baseRate = rateObj.USDHKD;
      let HKDRate = {
        'HKD': 1,
        'CNY': rateObj.USDCNY / baseRate,
        'USD': 1 / rateObj.USDHKD,
        'GBP': rateObj.USDGBP / baseRate,
        'JPY': rateObj.USDJPY / baseRate
      }
      rateArray = [];
      for(let key in HKDRate) {
        rateArray.push({name: key, value: HKDRate[key]});
      }
      return rateArray;
    }
  }
  return Rate;
}