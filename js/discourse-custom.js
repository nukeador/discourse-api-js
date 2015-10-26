var baseURL = 'https://discourse.mozilla-community.org';
var category = 'mozillians';
var topic = '4304';

client = new DiscourseApi(baseURL);

client.category(category, function(response) {
    // We need to wait until the remote response is back
    if (response) {
      var content = '<p>Details about the category: ' + category + '</p>\
                    <p>Number of topics retrieved: ' + response.topic_list.topics.length + '</p>\
                    <p>List of topics:</p>\
                    <ul>';
      
      for (var i = 0; i < response.topic_list.topics.length; i++) {
        var topic = response.topic_list.topics[i];
        var url = baseURL + '/t/' + topic.slug + '/' + topic.id;
        content += '<li><a href="' + url + '">' + topic.title + '</a> (' + topic.created_at + ') ' + topic.posts_count + ' posts - ' + topic.views + ' views - ' + topic.like_count + ' likes </li>';
      };
      
      content += '</ul><hr />';
      
      document.getElementById('content').innerHTML = content;
    }
});

client.topic(topic, function(response) {
    // We need to wait until the remote response is back
    if (response) {
        var url = baseURL + '/t/' + response.slug + '/' + response.id;
        var initPost = response.post_stream.posts[0];
        var profileUrl = baseURL + '/users/' + initPost.username;
        var content = '<p>Details about the topic: <a href="' + url +'">' + response.title + '</a></p>\
                        <ul>\
                            <li>Number of posts: ' + response.posts_count + '</li>\
                            <li>Created at: ' + response.created_at + '</li>\
                            <li>Created by: <a href="' + profileUrl + '">' + initPost.username + ' (' + initPost.name + ')</a></li>\
                            <li>Views: ' + response.views + '</li>\
                            <li>Posts: ' + response.posts_count + '</li>\
                            <li>Likes: ' + response.like_count + '</li>\
                        </ul>\
                        <p>Post content:</p>\
                        <div>' + initPost.cooked + '</div>';
      
      document.getElementById('content').innerHTML += content;
    }
});