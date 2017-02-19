window.addEventListener('load', function(){

	function getInfo(){
		var infoRequest = new XMLHttpRequest();
		infoRequest.open('GET', '/info');
		infoRequest.onload = function(e){
			var jsonInfo = JSON.parse(infoRequest.responseText);
			console.log(jsonInfo);
			structureMainComment(jsonInfo);
		}
		infoRequest.send();
	}

	function structureMainComment(json){
		//Add post div to containter
		container.appendChild(postDiv);
		//Add post main div to post div
		postDiv.appendChild(postMainDiv);
		var userImg = document.createElement("img");
		userImg.setAttribute('src', json[0].post.profPic);
		var mediaInfoDiv = document.createElement("media__info");
		var userNameDiv = document.createElement('a');
		userNameDiv.className = "userName";
		userNameDiv.setAttribute('href', '#');
        userNameDiv.setAttribute('data-friends', '32');
		var userNameText = document.createTextNode(json[0].post.name);
		//Add profile picture to media div
		mediaDiv.appendChild(userImg);
		userImg.className = "profilePhoto";
		//Add media div to post main div
		postMainDiv.appendChild(mediaDiv);
		//Add media info div to media div
        mediaDiv.appendChild(mediaInfoDiv);
        //Add user name link to media info div
        mediaInfoDiv.appendChild(userNameDiv);
        //Fill user name link with inner HTML user name
        userNameDiv.appendChild(userNameText);
	}

	var container = document.getElementsByClassName("outerContainer")[0];
	var postDiv = document.createElement("div");
	postDiv.className = "post";
	var postMainDiv = document.createElement("div");
	postMainDiv.className = "post__main";
	var mediaDiv = document.createElement("div");
	mediaDiv.className = "media";

	getInfo();
});