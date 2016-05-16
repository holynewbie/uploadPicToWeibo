// ==UserScript==
// @name           BinaryPost
// @namespace      happycheng10@126.com
// @description    post binary data like a local file or a blob to your server.
// @include        *
// ==/UserScript==



var BinaryPost = BinaryPost || (function(GM_POST){
	var getBoundary = function(){
		var z = 98729145294692;  var a = 12400722650394;
  		return Array(28).join('-') + Math.floor(Math.random() * (z - a)) + a;
	}
	return function (obj) {
		var body = [];
		var boundary = getBoundary();
		var res = {
			abort:function(){}
		};
		Promise.all((Object.getOwnPropertyNames(obj.data)).map(function(filedName){
			if(obj.data[filedName] instanceof Blob)
			return new Promise(function(success){
				let fr = new FileReader();
				fr.onload = function(){
					body.push('--' + boundary);
					var disp = 'Content-Disposition: form-data; name="' + filedName + '"';
					if(obj.data[filedName].name){
						disp += '; filename="' + obj.data[filedName].name + '"';
					}
					body.push(disp);
					body.push('Content-type: ' + obj.data[filedName].type);
					body.push('');
					body.push(fr.result);
					success();
				};
				fr.readAsBinaryString(obj.data[filedName]);
			});
			body.push('Content-Disposition: form-data; name="' + filedName + '"');
			body.push('');
			body.push(obj.data[filedName]);
			return Promise.resolve(true);
		})).then(function(){
			body.push('--' + boundary + '--');
			var data = body.join('\r\n');
			var headers = {};
			if(obj.headers){ headers = obj.headers; }
			headers["Content-Type"] = 'multipart/form-data; boundary=' + boundary;
			headers["Content-Length"] = data.length
			var request = {
				method: 'POST',
				url: obj.url,
				binary: true,
				headers: headers,
				data: data,
				onload: obj.onload,
				ontimeout: obj.onload,
				timeout: obj.timeout || 2000,
			};
			GM_POST(request);
		});
	}
})(GM_xmlhttpRequest);

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth ;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    return dataURL;//.replace(/^data:image\/(png|jpg);base64,/, "");
}
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}
