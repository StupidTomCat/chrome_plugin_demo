function httpRequest(url, callback){
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}
function showWeather(result){
    console.log(result);
    result = JSON.parse(result);
    var forecast = result.data.forecast;
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    for(var i in forecast){
        var d = forecast[i].date;
        table += '<tr>';
        table += '<td>'+d+'</td>';
        table += '<td>'+forecast[i].type+'</td>';
        table += '<td>'+forecast[i].low+'</td>';
        table += '<td>'+forecast[i].high+'</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}
var city = localStorage.city;
city = city?city:'北京';
var url = decodeURI(encodeURI(encodeURI('http://wthrcdn.etouch.cn/weather_mini?city='+city)));
httpRequest(url, showWeather);
