// ==UserScript==
// @name        uploadPicToWeibo
// @description upload your local picture to sina weibo
// @version     0.0.5
// @namespace   happycheng10@126.com
// @include     http://photo.weibo.com/upload/index
// @updateURL   https://holynewbie.github.io/uploadPicToWeibo/uploadPicToWeibo.meta.js
// @downloadURL https://holynewbie.github.io/uploadPicToWeibo/uploadPicToWeibo.user.js
// @grant       GM_setClipboard
// ==/UserScript==

var src = 'http://holynewbie.github.io/uploadPicToWeibo/uploadToWeiboPic.html';

(function(){
    document.body.innerHTML = `
        <iframe id=fuckweibo src="${src}"></iframe>
        <div class="mycontainer"></div>
    `;

    var style = `
      #fuckweibo {
        width: 100%;
        height: 250px;
        border: none;
      }
      .img-thumbnail{
        float:right;
      }
    `;
    var stylesheet = document.createElement('style');
    stylesheet.innerHTML = style;
    document.body.appendChild(stylesheet);

    var link = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('href','http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css');
    document.head.appendChild(link);
})();

function commonUploadComplete(ret) {
  document.querySelector('#fuckweibo').setAttribute('src', src);
  var container = document.querySelector('.mycontainer');
  container.insertBefore(getButtons(ret.pid), container.firstElementChild);
}

exportFunction(commonUploadComplete, unsafeWindow, {defineAs: "commonUploadComplete"});

exportFunction(function(button){
  var input = button.parentNode.previousElementSibling;
  input.select();
  document.execCommand('copy');
}, unsafeWindow, {defineAs:'copyPic'});


function getButtons(src) {
  var cateName=['thumb180', 'mw690', 'mw1024', 'large'];
  var cate = ['缩略图', '预览图', '大图', '原图'];
  var template = document.createElement('template');
  var html = `
    <div class="row">
      <div class="col-md-3">
        <img class="img-thumbnail" src="http://ws3.sinaimg.cn/thumb180/${src}.jpg"/>
      </div>
      <div class="col-md-6">
  `;

  cateName.forEach(function(c,i){
    html += `
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control" value="http://ws3.sinaimg.cn/${c}/${src}.jpg"/>
          <span class="input-group-btn">
            <button class="btn btn-primary" onclick="copyPic(this)">点我复制${cate[i]}</button>
          </span>
        </div>
      </div>`;
  });
  html += '</div></div><hr/>';

  template.innerHTML = html;
  return document.importNode(template.content, true);
}

exportFunction(getButtons, unsafeWindow, {defineAs:'getButtons'});
