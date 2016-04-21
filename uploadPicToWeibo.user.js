// ==UserScript==
// @name        uploadPicToWeibo
// @description upload your local picture to sina weibo
// @version     0.0.2
// @namespace   happycheng10@126.com
// @include     http://photo.weibo.com/upload/index
// @downloadURL https://holynewbie.github.io/uploadPicToWeibo/uploadPicToWeibo.user.js
// @grant       GM_setClipboard
// ==/UserScript==

var src = 'http://holynewbie.github.io/uploadPicToWeibo/uploadToWeiboPic.html';

!function(){
	var body = document.querySelector('body');
	body.style="width:100%;height:"+window.innerHeight+'px';
	body.innerHTML = '<iframe id="fuckweibo" style="width:100%;height:100%;border:none;" src="'+src+'"></iframe>';
}();
exportFunction(function (ret) {
  GM_setClipboard('[img]http://ww4.sinaimg.cn/large/' + ret.pid + '.jpg[/img]');
  document.querySelector('#fuckweibo').src = src;
}, unsafeWindow, {defineAs: "commonUploadComplete"});
