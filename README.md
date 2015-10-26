## Discourse API

### Usage

Add the library and your custom code before your ``</body>``:

    <script src="js/discourse-api.js"></script>
    <script src="js/discourse-custom.js"></script>

Then create an empty file ``js/discourse-custom.js`` with the basic info:

	var baseURL = 'https://discourse.mozilla-community.org';

#### Examples

##### Get latests posts in a category

	client = new DiscourseApi(baseURL);
	var category = 'mozillians';

	client.category(category, function(response) {
        // We need to wait until the remote response is back
            if (response) {
                  // Your code here  
            }
        });
The ``response`` variable will include the category object with all information such as:

	response.topic_list.topics.length // Number of topics retrieved
	response.topic_list.topics[0] // Object with the first topic
	response.topic_list.topics[0].slug
	response.topic_list.topics[0].id
	response.topic_list.topics[0].title
        response.topic_list.topics[0].created_at
        response.topic_list.topics[0].views
        response.topic_list.topics[0].like_count

##### Get a specific topic

	client = new DiscourseApi(baseURL);
	var topic = '56';

	client.topic(topic, function(response) {
        // We need to wait until the remote response is back
            if (response) {
                  // Your code here  
            }
        });

The ``response`` variable will include the topic object with all information such as:

	response.title
        response.slug
	response.id
	response.posts_count // Number of messages, including the first one
	response.created_at
	response.post_stream.posts[0] // Object with the first message info
	response.post_stream.posts[0].username
	response.post_stream.posts[0].name
	response.post_stream.posts[0].views
	response.post_stream.posts[0].like_count
	response.post_stream.posts[0].avatar_template
	response.post_stream.posts[0].cooked // Message content in HTML
	
Check [example.html](https://github.com/nukeador/discourse-blog/blob/master/example.html) and [js/discourse-custom.js](https://github.com/nukeador/discourse-blog/blob/master/js/discourse-custom.js) for a full example.
