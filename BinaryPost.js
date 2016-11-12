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
		Promise.all((Object.getOwnPropertyNames(obj.data)).map(function(filedName){
			if(obj.data[filedName] instanceof Blob){
				return new Promise(function(success){
					let fr = new FileReader();
					fr.onload = function(){
						body.push('--' + boundary);
						var disp = 'Content-Disposition: form-data; name="' + filedName + '"';
						//sometimes it must has a filename
						disp += '; filename="' + (obj.data[filedName].name||'BinaryPost') + '"';
						body.push(disp);
						body.push('Content-type: ' + obj.data[filedName].type);
						body.push('');
						body.push(fr.result);
						success();
					};
					fr.readAsBinaryString(obj.data[filedName]);
				});
			}
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
				onerror: obj.onerror || obj.onload,
				onprogress: obj.onprogress || function(){}
			};
			console.log('start to post data');
			GM_POST(request);
		});
	}
})(GM_xmlhttpRequest);
