// Edit to set discourse URL and category to fetch
var baseURL = 'https://discourse.mozilla-community.org';
var category = 'mozillians';

// We fetch latest posts and then each post content async
function discourseBlog () {
    document.getElementById('cat-name').innerHTML = category;
    
    client = new DiscourseApi(baseURL);
    
    // Get category latests topics
    client.category(category, function(res) {
        // We need to wait until the remote response is back
        if (res) {
            var topics = res;
            var topicNum = topics.topic_list.topics.length;

            for (var i = 0; i < topicNum; i++) {
                var topic = topics.topic_list.topics[i];
                var topicURL = baseURL + '/t/' + topic.slug + '/' + topic.id;
                
                // Adding post wrapper
                document.getElementById('content-main').innerHTML += '<article id="' + topic.id + '" class="post"><header class="entry-header"><h2 class="entry-title"><a href="' + topicURL + ' ">' + topic.title + '</a></h2></header>';
                
                // Get each topic post 0 content
                client.topic(topic.id, function(res) {
                    // Again, we need to wait until response is ready
                    if (res) {
                        var topic = res;
                        // Set the topicURL again to avoid losing it in the loop
                        var topicURL = baseURL + '/t/' + topic.slug + '/' + topic.id;
                        var replies = topic.posts_count - 1;
                        
                        // Day, month and year
                        var date = Date.parse(topic.created_at);
                        var date = new Date(date);
                        
                        var months = new Array(12);
                        months[0] = "Jan";
                        months[1] = "Feb";
                        months[2] = "Mar";
                        months[3] = "Apr";
                        months[4] = "May";
                        months[5] = "Jun";
                        months[6] = "Jul";
                        months[7] = "Aug";
                        months[8] = "Sep";
                        months[9] = "Oct";
                        months[10] = "Nov";
                        months[11] = "Dec";
                        
                        var month = months[date.getUTCMonth()];
                        var day = date.getUTCDate();
                        var year = date.getUTCFullYear();
                        
                        // Fix to get the right avatar URL
                        var topic_avatar_template = baseURL + topic.post_stream.posts[0].avatar_template;
                        var avatar_template = topic_avatar_template.replace("{size}", "45");
                        var usernameURL = baseURL + '/users/' + topic.post_stream.posts[0].username;
                        
                        // We use username by default unless there is a full name
                        name = topic.post_stream.posts[0].username;
                        if (topic.post_stream.posts[0].name) {
                            name = topic.post_stream.posts[0].name;
                        }
                        
                        // Adding user info
                        document.getElementById(topic.id).firstChild.innerHTML += '<p class="entry-posted"><time class="published" title="' + topic.created_at + '" datetime="' + topic.created_at + '"><a class="posted-month">' + month + '</a><span class="posted-date">' + day +'</span><a class="posted-year">' + year + '</a></time></p><address class="vcard"><cite class="author fn"><a class="url" href="' + usernameURL + '"><img class="avatar avatar-24 photo" width="26" height="26" src="' + avatar_template +'" alt="" />' + name + '</a></cite></address>';
                        
                        // Adding post content
                        document.getElementById(topic.id).innerHTML += '<div class="entry-content">' + topic.post_stream.posts[0].cooked + '</div>';
                        
                        // Post footer
                        document.getElementById(topic.id).innerHTML += '<footer class="entry-meta"><div class="meta"><div class="footer-box"><a href="' + topicURL + '/2">' + replies + '<br /><span>replies</span></a></div><div class="footer-box">' + topic.views + '<br /><span>views</span></div><div class="footer-box">' + topic.like_count + '<br /><span class="likes">likes</span></div></div></footer></article>';
                    }
                });
            };
                
            // Final footer
            document.getElementById('content-main').innerHTML += '<nav class="nav-paging"><ul><li class="prev"><a href="' + baseURL + '/' +  category + '">All posts</a></li> </ul></nav>';
        }
    });
        
}             

window.addEventListener("load", discourseBlog);