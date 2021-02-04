/**
 * Created by dell on 2021/1/29.
 */
function btn_move(el, mouseLeft, mouseTop){
    var leftRnd = (Math.random()-0.5)*20;//随机一个左右移动的范围
    var topRnd = (Math.random()-0.5)*20; //随机一个上下移动的范围
    var btnLeft = mouseLeft+(leftRnd>0?100:-100)+leftRnd;//移动后的位置
    var btnTop = mouseTop+(topRnd>0?30:-30)+topRnd;//同理
    btnLeft = btnLeft<100?(btnLeft+window.innerWidth-200):(btnLeft>window.innerWidth-100?btnLeft-window.innerWidth+200:btnLeft);//如果移动后的位置在可视区左右边界不到100px的位置，调整一下
    btnTop = btnTop<100?( btnTop+window.innerHeight-200):(btnTop>window.innerHeight-100?btnTop-window.innerHeight+200:btnTop);//同理
    el.style.position = 'fixed';
    el.style.left = btnLeft+'px';
    el.style.top = btnTop+'px';
}
function over_btn(e){//事件理解为浏览器的感知系统,e代表事件，IE中的事件对象是个全局的属性window.event,而标准浏览器的事件对象就是形参e
    if(!e){//兼容IE和非IE
        e = window.event;
    }
    btn_move(this, e.clientX, e.clientY);//clientX、clientY鼠标在网页中的坐标，相对浏览器可视区域左上角距离，不随页面滚动而改变。
}
document.getElementById('stb').onmouseover = over_btn;
