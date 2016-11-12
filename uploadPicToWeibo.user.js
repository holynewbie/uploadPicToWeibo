// ==UserScript==
// @name        uploadPicToWeibo
// @description upload your local picture to sina weibo
// @version     0.0.4
// @namespace   happycheng10@126.com
// @include     http://photo.weibo.com/upload/index
// @updateURL   https://holynewbie.github.io/uploadPicToWeibo/uploadPicToWeibo.meta.js
// @downloadURL https://holynewbie.github.io/uploadPicToWeibo/uploadPicToWeibo.user.js
// @grant       GM_setClipboard
// ==/UserScript==

var src = 'http://holynewbie.github.io/uploadPicToWeibo/uploadToWeiboPic.html';
// var src = '//localhost/a.htm';

(function(){
	document.body.innerHTML = '<iframe id="fuckweibo" style="width:100%;height:250px;border:none;" src="'+src+'"></iframe><style type="text/css"> .img-thumbnail{float:right; } </style><div class="mycontainer"></div>'; 
	var link = document.createElement('link');
	link.setAttribute('rel','stylesheet');
	link.setAttribute('href','http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css');
	document.head.appendChild(link);
})();
exportFunction(function (ret) {
  var html = getButtons(ret.pid);
  var container = document.querySelector('.mycontainer');
  container.innerHTML = html + container.innerHTML;
  document.querySelector('#fuckweibo').setAttribute('src',src);
  window.clearInterval(progressTimer);
  document.querySelector('.progress').style.display="none";
  document.querySelector('.progress-bar').style.width="0%";
}, unsafeWindow, {defineAs: "commonUploadComplete"});
exportFunction(function(button){
		var input = button.parentElement.previousSibling;
		input.select();
		document.execCommand('copy');
},unsafeWindow,{defineAs:'copyPic'});
function copyPic(button){
		var input = button.parentElement.previousSibling;
		input.select();
		document.execCommand('copy');
}
exportFunction(function(src) {
		var cateName=['thumb180', 'mw690', 'mw1024', 'large'];
		var cate = ['缩略图', '预览图', '大图', '原图'];
		var html = '<div class="row"><div class="col-md-3"><img class="img-thumbnail"src="http://ww4.sinaimg.cn/thumb180/'+src+'.jpg"></div><div class="col-md-6">';
		cateName.forEach(function(c,i){
			html += '<div class="form-group"><div class="input-group"><input type="text" class="form-control" value="http://pt.hit.edu.cn/'+c+'/'+src+'.jpg"><span class="input-group-btn"><button class="btn btn-primary" onclick="copyPic(this)">点我复制'+cate[i]+'</button></span></div></div>';
		});
		html += '</div></div><hr/>';
		return html;
},unsafeWindow,{defineAs:'getButtons'});
function getButtons(src) {
		var cateName=['thumb180', 'mw690', 'mw1024', 'large'];
		var cate = ['缩略图', '预览图', '大图', '原图'];
		var html = '<div class="row"><div class="col-md-3"><img class="img-thumbnail"src="http://ww4.sinaimg.cn/thumb180/'+src+'.jpg"></div><div class="col-md-6">';
		cateName.forEach(function(c,i){
			html += '<div class="form-group"><div class="input-group"><input type="text" class="form-control" value="http://pt.hit.edu.cn/'+c+'/'+src+'.jpg"><span class="input-group-btn"><button class="btn btn-primary" onclick="copyPic(this)">点我复制'+cate[i]+'</button></span></div></div>';
		});
		html += '</div></div><hr/>';
		return html;
}
