/**
 * Created by dell on 2021/1/28.
 */
// 通过postMessage调用content-script
function invokeContentScript(code)
{
    window.postMessage({cmd: 'invoke', code: code}, '*');
}
// 发送普通消息到content-script
function sendMessageToContentScriptByPostMessage(data)
{
    window.postMessage({cmd: 'message', data: data}, '*');
    //postMessage()方法语法:
    // targetWindow.postMessage（message，targetOrigin，[ transfer ]）;
    //targetWindow:对将接收消息的窗口的引用
    //message:要发送到其他窗口的数据。
    // targetOrigin:指定要调度的事件的targetWindow的原点，可以是文字字符串"*"（表示没有首选项），也可以是URI。
    //
}
