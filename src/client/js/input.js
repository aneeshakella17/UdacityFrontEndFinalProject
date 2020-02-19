function add(a,b){
    return a + b;
}

function testDeparture(input){
    var dateEntered = new Date(input);
    var currentTime = new Date();
    var difference_time =  dateEntered.getTime() - currentTime.getTime();
    var difference_days = difference_time / (1000 * 3600 * 24);
    if(difference_days > 0){
      return true
    }
    return false
}

export {testDeparture, add}
