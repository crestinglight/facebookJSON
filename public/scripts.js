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
		userImg.className = "profilePhoto";
		var mediaInfoDiv = document.createElement("media__info");
		var userNameDiv = document.createElement('a');
		userNameDiv.className = "userName";
		userNameDiv.setAttribute('href', '#');
        userNameDiv.setAttribute('data-friends', '32');
		var userNameText = document.createTextNode(json[0].post.name);
		var timeDiv = document.createElement("div");
		var timePosted = document.createTextNode(json[0].post.timePosted);
		var postBodyDiv = document.createElement("div");
		var mainPostP = document.createElement("p");
		var mainPostText = document.createTextNode(json[0].post.postContent);
		postBodyDiv.className = "post__body";
		appendOPChildred(mediaDiv, userImg, postMainDiv, mediaInfoDiv, userNameDiv, userNameText, timeDiv, timePosted, postBodyDiv, mainPostP, mainPostText);
        fillOPActions(postMainDiv,json);
	}

	function appendOPChildred(mediaDiv, userImg, postMainDiv, mediaInfoDiv, userNameDiv, userNameText, timeDiv, timePosted, postBodyDiv, mainPostP, mainPostText){
		//Add profile picture to media div
		mediaDiv.appendChild(userImg);
		//Add media div to post main div
		postMainDiv.appendChild(mediaDiv);
		//Add media info div to media div
        mediaDiv.appendChild(mediaInfoDiv);
        //Add user name link to media info div
        mediaInfoDiv.appendChild(userNameDiv);
        //Fill user name link with inner HTML user name
        userNameDiv.appendChild(userNameText);
        mediaInfoDiv.appendChild(timeDiv);
        timeDiv.appendChild(timePosted);
        postMainDiv.appendChild(postBodyDiv);
        postBodyDiv.appendChild(mainPostP);
        mainPostP.appendChild(mainPostText);
	}

	function fillOPActions(pmaindiv,json){
		var postActionsDiv = document.createElement("div");
		postActionsDiv.className = "post__actions";
		
		var likesClickDiv = document.createElement("a");
		likesClickDiv.setAttribute('href', '#');
		likesClickDiv.className = "action action--like likeClick";
		likesClickDiv.innerHTML = "Like";

		var commentClickDiv = document.createElement("a");
		commentClickDiv.setAttribute('href', '#');
		commentClickDiv.className = "action action--comment";
		commentClickDiv.innerHTML = "Comment";

		var shareClickDiv = document.createElement("a");
		shareClickDiv.setAttribute('href', '#');
		shareClickDiv.className = "action action--share";
		shareClickDiv.innerHTML = "Share";

		appendOPActions(pmaindiv, postActionsDiv, likesClickDiv, commentClickDiv, shareClickDiv);
		fillPostDetails(json);
	}

	function appendOPActions(pmaindiv, postActionsDiv, likesClickDiv, commentClickDiv, shareClickDiv){
		pmaindiv.appendChild(postActionsDiv);
		pmaindiv.appendChild(likesClickDiv);
		pmaindiv.appendChild(commentClickDiv);
		pmaindiv.appendChild(shareClickDiv);
	}

	function fillPostDetails(json){
		postDiv.appendChild(postDetailsDiv);
		var postInfoDiv = document.createElement("div");
		var postCommentsDiv = document.createElement("div");
		postInfoDiv.className = "post__info";
		postCommentsDiv.className = "post__comments";
		postDetailsDiv.appendChild(postInfoDiv);
		var spanLikesDiv = document.createElement("span");
		var spanCommentsDiv = document.createElement("span");
		var likeCountText = document.createTextNode(json[0].post.likeCount + " likes");
		var commentCountText = document.createTextNode(json[0].post.commentsCount + " comments");
		appendPostDetails(postInfoDiv, spanLikesDiv, likeCountText, spanCommentsDiv, commentCountText, postDetailsDiv, postCommentsDiv);
		tryReplies(json, postCommentsDiv);
	}

	function appendPostDetails(postInfoDiv, spanLikesDiv, likeCountText, spanCommentsDiv, commentCountText, postDetailsDiv, postCommentsDiv){
		postInfoDiv.appendChild(spanLikesDiv);
		spanLikesDiv.appendChild(likeCountText);
		postInfoDiv.appendChild(spanCommentsDiv);
		spanCommentsDiv.appendChild(commentCountText);
		postDetailsDiv.appendChild(postCommentsDiv);
	}

	function tryReplies(json, pcommentsdiv){
		var myKeys = Object.keys(json[0].post.replies);
		for (var i = 0; i < myKeys.length; i++){
			var replyKey = myKeys[i];
			var replyData = json[0].post.replies[replyKey];
			populateReplies(replyData, json, pcommentsdiv);
		}
	}

	function populateReplies(replyData, json, pcommentsdiv){
		var commentsMediaDiv = document.createElement("div");
		var userImg = document.createElement("img");
		var mediaInfo = document.createElement("div");
		var userName = document.createElement("a");
		var commentText = document.createTextNode(replyData.replyContent);
		var commentInfo = document.createElement("div");
		commentsMediaDiv.className = "comment media";
		userImg.className = "profilePhoto";
		userImg.setAttribute('src', replyData.profPic);
		mediaInfo.className = "media__info";
		userName.className = "userName";
		userName.setAttribute('href', '#');
		userName.setAttribute("data-friends", "30");
		userName.innerHTML = replyData.name;
		commentInfo.className = "comment__info";
		pcommentsdiv.appendChild(commentsMediaDiv);
		commentsMediaDiv.appendChild(userImg);
		commentsMediaDiv.appendChild(mediaInfo);
		mediaInfo.appendChild(userName);
		mediaInfo.appendChild(commentText);
		mediaInfo.appendChild(commentInfo);
		populateCommentInfo(commentInfo, replyData);
	}

	function populateCommentInfo(commentInfo, replyData){
		//Populates the like button.
		var likeClick = document.createElement("a");
		likeClick.className = "likeClick";
		likeClick.setAttribute('href', '#');
		likeClick.innerHTML = "Like";
		commentInfo.appendChild(likeClick);

		//Populates the number of replies on the post.
		var replyCount = document.createElement("a");
		replyCount.className = "replyCount";
		replyCount.setAttribute('href', '#');
		replyCount.innerHTML = replyData.replyCount + " replies";
		commentInfo.appendChild(replyCount);

		//Populates the number of likes on the post.
		var numOfLikes = document.createElement("span");
		numOfLikes.innerHTML = replyData.likeCount + " likes";
		commentInfo.appendChild(numOfLikes);

		//Populates the time the user posted the comment.
		var timePosted = document.createTextNode(replyData.timePosted);
		commentInfo.appendChild(timePosted);
	}

	var container = document.getElementsByClassName("outerContainer")[0];
	var postDiv = document.createElement("div");
	postDiv.className = "post";
	var postMainDiv = document.createElement("div");
	postMainDiv.className = "post__main";
	var mediaDiv = document.createElement("div");
	mediaDiv.className = "media";
	var postDetailsDiv = document.createElement("div");
	postDetailsDiv.className = "post__details";

	getInfo();
});