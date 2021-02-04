function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log("lalala"+"已经接收到了全部数据，并且连接已经关闭。(网络断没断都会执行)");
            console.log(xhr.status);
            callback(true);
        }
    }
    xhr.onerror = function () {
        console.log("lalala"+"哎呀，该网站不在了");
        callback(false);
    }
    xhr.send();
}

setInterval(function(){
                httpRequest('https://www.csdn.net/', function(status){
                    chrome.browserAction.setIcon({
                        path: 'imgs/'+(status?'yuan_rss_03_copy_smaller.png':'yuan_rss_06_copy_smaller.png')
                    });
                });
            },5000);
