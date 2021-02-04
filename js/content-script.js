/**
 * Created by dell on 2021/1/28.
 */

console.log('我是content script!');
//必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function()
{   //addEventListener() 方法，事件监听 可以使用 removeEventListener()方法来移除事件的监听。
    //语法
    // element.addEventListener(event, function, useCapture);
    // 第一个参数是事件的类型 (如 "click" 或 "mousedown").
    // 第二个参数是事件触发后调用的函数。
    // 第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。
    // 注意:不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。
    //当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
    // 注入自定义JS
    injectCustomJs();
    console.log("注入成功！")
    initCustomPanel();
});

async function initCustomPanel()
{

    const result = await download();

    var panel = document.createElement('div');
    panel.className = 'chrome-plugin-demo-panel';
    panel.innerHTML = `
		<h2>injected-script操作content-script演示区：</h2>
		<div class="btn-area">
			<a href="javascript:sendMessageToContentScriptByPostMessage('你好，我是普通页面！')">通过postMessage发送消息给content-script</a><br>
		    <a href="javascript:invokeContentScript('sendMessageToBackground()')"> content-script发送消息到后台</a><br>
		    <a href="" id="video-complete" onclick="start()">lalala</a>
		</div>`;
    document.body.appendChild(panel);

    const completeLink = document.getElementById("video-complete");
    completeLink.setAttribute("href", result.url);
    completeLink.setAttribute("download", result.filename);
}
function start(){
    console.log(completeLink);

}
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage({greeting: message || '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
        console.log('收到来自后台的回复：' + response);
    });
}

window.addEventListener("message", function(e)
{
    console.log('收到消息：', e.data);
    if(e.data && e.data.cmd == 'invoke') {
        eval('('+e.data.code+')');
    }
    else if(e.data && e.data.cmd == 'message') {
        console.log(e.data.data);
    }
}, false);

// 向页面注入JS
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function()//onload属性在对象已加载时触发，一旦完全加载，就执行一段脚本
    {
        // 放在页面不好看，执行完后移除掉，功能应该还在，只是页面上看不见该标签了
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

var info = {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "from": "local",
        "result": "suee",
        "message": "",
        "quality": 32,
        "format": "flv480",
        "timelength": 629017,
        "accept_format": "flv,flv720,flv480,mp4",
        "accept_description": [
            "高清 1080P",
            "高清 720P",
            "清晰 480P",
            "流畅 360P"
        ],
        "accept_quality": [
            80,
            64,
            32,
            16
        ],
        "video_codecid": 7,
        "seek_param": "start",
        "seek_type": "offset",
        "durl": [
            {
                "order": 1,
                "length": 629017,
                "size": 31580116,
                "ahead": "",
                "vhead": "",
                "url": "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/48/47/221164748/221164748-1-32.flv?e=ig8euxZM2rNcNbRg7WdVhoM1hbUVhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNo8g2ENvNo8i8o859r1qXg8xNEVE5XREto8GuFGv2U7SuxI72X6fTr859r1qXg8gNEVE5XREto8z5JZC2X2gkX5L5F1eTX1jkXlsTXHeux_f2o859IB_&uipk=5&nbs=1&deadline=1612433341&gen=playurl&os=cosbv&oi=3062786326&trid=68e06a6632244b1e92979a4dfd73c072u&platform=pc&upsig=b51608392b33db8630e9b4da92af3822&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&orderid=0,3&agrr=1&logo=80000000",
                "backup_url": [
                    "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/48/47/221164748/221164748-1-32.flv?e=ig8euxZM2rNcNbRg7WdVhoM1hbUVhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNo8g2ENvNo8i8o859r1qXg8xNEVE5XREto8GuFGv2U7SuxI72X6fTr859r1qXg8gNEVE5XREto8z5JZC2X2gkX5L5F1eTX1jkXlsTXHeux_f2o859IB_&uipk=5&nbs=1&deadline=1612433341&gen=playurl&os=cosbv&oi=3062786326&trid=68e06a6632244b1e92979a4dfd73c072u&platform=pc&upsig=b51608392b33db8630e9b4da92af3822&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&orderid=1,3&agrr=1&logo=40000000",
                    "https://upos-sz-mirrorcosb.bilivideo.com/upgcxcode/48/47/221164748/221164748-1-32.flv?e=ig8euxZM2rNcNbRg7WdVhoM1hbUVhwdEto8g5X10ugNcXBlqNxHxNEVE5XREto8KqJZHUa6m5J0SqE85tZvEuENvNo8g2ENvNo8i8o859r1qXg8xNEVE5XREto8GuFGv2U7SuxI72X6fTr859r1qXg8gNEVE5XREto8z5JZC2X2gkX5L5F1eTX1jkXlsTXHeux_f2o859IB_&uipk=5&nbs=1&deadline=1612433341&gen=playurl&os=cosbbv&oi=3062786326&trid=68e06a6632244b1e92979a4dfd73c072u&platform=pc&upsig=1e18b6e08dff4711140e11277ca03c5f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&orderid=2,3&agrr=1&logo=40000000"
                ]
            }
        ],
        "support_formats": [
            {
                "quality": 80,
                "format": "flv",
                "new_description": "1080P 高清",
                "display_desc": "1080P",
                "superscript": ""
            },
            {
                "quality": 64,
                "format": "flv720",
                "new_description": "720P 高清",
                "display_desc": "720P",
                "superscript": ""
            },
            {
                "quality": 32,
                "format": "flv480",
                "new_description": "480P 清晰",
                "display_desc": "480P",
                "superscript": ""
            },
            {
                "quality": 16,
                "format": "mp4",
                "new_description": "360P 流畅",
                "display_desc": "360P",
                "superscript": ""
            }
        ]
    }
}
var fragment = info.data.durl[0];
var fragmentSplitFactor = 12;
var fragmentSize = null;
var workingXhr = [];
var progressMap = new Map();
async function download()
{
    const downloadedData = [];
    this.fragmentSize = this.fragment.size;
    const data = await this.downloadFragment(fragment);
    downloadedData.push(data);
    if (downloadedData.length < 1)
    {
        throw new Error("下载失败.");
    }

    let blob = null;
    let filename = null;
    if (downloadedData.length === 1)
    {
        [blob, filename] = this.downloadSingle(downloadedData);
    }

    const blobUrl = URL.createObjectURL(blob);
    return {
        url: blobUrl,
        filename: filename
    };
}

async function downloadFragment(fragment)
{
    const promises = [];
    this.workingXhr = [];
    this.progressMap = new Map();
    this.updateProgress();
    const partialLength = Math.round(fragment.size / this.fragmentSplitFactor);
    let startByte = 0;
    const getPartNumber = xhr => [...this.progressMap.keys()].indexOf(xhr) + 1;//扩展运算符是三个点（…）。该运算符主要用于函数调用。
    //是在ES6中新增加的内容，它可以在函数调用/数组构造时，将数组表达式或者string在语法层面展开（剥去外壳只剩对象或数组里面的内容）；
    while (startByte < fragment.size)
    {
        const endByte = Math.min(fragment.size - 1, Math.round(startByte + partialLength));
        const range = `bytes=${startByte}-${endByte}`;
        const rangeLength = endByte - startByte + 1;
        promises.push(new Promise((resolve, reject) =>
        {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", fragment.url);
            xhr.responseType = "arraybuffer";
            xhr.withCredentials = false;
            xhr.addEventListener("progress", (e) =>
            {
                console.log(`[下载视频] 视频片段${getPartNumber(xhr)}下载进度: ${e.loaded}/${rangeLength} bytes loaded, ${range}`);
                this.progressMap.set(xhr, e.loaded);
                this.updateProgress();
            });
            xhr.addEventListener("load", () =>
            {
                if (("" + xhr.status)[0] === "2")
                {
                    resolve(xhr.response);
                }
                else
                {
                    reject(`请求失败.`);
                }
            });
            xhr.addEventListener("abort", () => reject("下载已取消."));
            xhr.addEventListener("error", () =>
            {
                console.error(`[下载视频] 视频片段${getPartNumber(xhr)}下载失败: ${range}`);
                this.progressMap.set(xhr, 0);
                this.updateProgress();
                xhr.open("GET", fragment.url);
                xhr.setRequestHeader("Range", range);
                xhr.send();
            });
            xhr.setRequestHeader("Range", range);
            xhr.setRequestHeader("host", "api.bilibili.com");
            this.progressMap.set(xhr, 0);
            xhr.send();
            this.workingXhr.push(xhr);
        }));
        startByte = Math.round(startByte + partialLength) + 1;
    }
    return Promise.all(promises);
}
function updateProgress()
{
    const progress = this.progressMap ?
        [...this.progressMap.values()].reduce((a, b) => a + b, 0) / this.fragmentSize : 0;
    if (progress > 1 || progress < 0)
    {
        console.error(`[下载视频] 进度异常: ${progress}`, this.progressMap.values());
    }
}
function downloadSingle(downloadedData)
{
    const [data] = downloadedData;
    const blob = this.makeBlob(data);
    const filename = "lalala" + (Math.random()+1)*100 + this.extension();
    return [blob, filename];
}
function makeBlob(data, fragment = null)
{
    return new Blob(Array.isArray(data) ? data : [data], {
        type: this.extension(fragment) === ".flv" ? "video/x-flv" : "video/mp4"
    });
}
function extension(fragment)
{
    /*return (fragment || this.fragments[0]).url
        .indexOf(".flv") !== -1
        ? ".flv"
        : ".mp4";*/
    return ".flv"
}

