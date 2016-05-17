// ==UserScript==
// @name        uploadPicFromDoubanToWeibo
// @description upload a douban poster to sina weibo
// @version     0.0.1
// @namespace   happycheng10@126.com
// @include     *.doubanio.com/view/photo/raw/public/*
// @require     https://raw.githubusercontent.com/holynewbie/uploadPicToWeibo/gh-pages/BinaryPost.js
// @updateURL   https://holynewbie.github.io/uploadPicToWeibo/uploadPicFromDoubanToWeibo.meta.js
// @downloadURL https://holynewbie.github.io/uploadPicToWeibo/uploadPicFromDoubanToWeibo.user.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==


//add some css 
var link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href','//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css');
document.head.appendChild(link);

//add a button
var button = document.createElement('button');
button.innerHTML = '上传这张照片';
button.setAttribute('class','btn btn-lg btn-primary');
button.setAttribute('style','position:absolute;margin:-23px -71px;width:142px;height:46px;top:50%;left:50%;')
button.setAttribute('onclick','upload()')
document.body.appendChild(button);



var url = 'http://picupload.service.weibo.com/interface/pic_upload.php?s=rdxt&app=miniblog&cb=http://photo.weibo.com/upload/simple_upload/pic/1';

exportFunction(function() {
	var img = document.querySelector('img');
	imgToBlob(img,function(blob){
		var obj = {
			data:{
				'pic1':blob
			},
			url:url,
			onload:function(o){
				document.body.innerHTML = getButtons((o.finalUrl.match(/pid=(.*?)&/))[1]);
			},
			onprogress:function(o){
				if(o.lengthComputable){
					document.location.hash = Math.ceil(o.loaded/o.total)*100+'%';
				}
			}
		}
		BinaryPost(obj)
	});
},unsafeWindow,{defineAs:'upload'});


function imgToBlob(img,callback){
	var canvas = document.createElement('canvas');
	console.log(canvas.width = img.naturalWidth);
    console.log(canvas.height = img.naturalHeight);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(callback,'image/jpeg',0.8);
}

function getButtons(src) {
		var cateName=['thumb180', 'mw690', 'mw1024', 'large'];
		var cate = ['缩略图', '预览图', '大图', '原图'];
		var html = '<div class="row"><div class="col-md-3"><img class="img-thumbnail"src="http://ww4.sinaimg.cn/thumb180/'+src+'.jpg"></div><div class="col-md-6">';
		cateName.forEach(function(c,i){
			html += '<div class="form-group"><div class="input-group"><input type="text" class="form-control" value="http://ww4.sinaimg.cn/'+c+'/'+src+'.jpg"><span class="input-group-btn"><button class="btn btn-primary" onclick="copyPic(this);close_window();">点我复制'+cate[i]+'</button></span></div></div>';
		});
		html += '</div></div><hr/>';
		return html;
}

exportFunction(function() {
  if (confirm('关闭窗口')) {
    close();
  }
},unsafeWindow,{defineAs:'close_window'})

exportFunction(function(button){
		var input = button.parentElement.previousSibling;
		input.select();
		document.execCommand('copy');
},unsafeWindow,{defineAs:'copyPic'});
