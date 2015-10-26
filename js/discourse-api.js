// Object to work with API
function DiscourseApi(url) {
    this.url = url;
}

DiscourseApi.prototype.category = function (id, cb) {
    var object = new XMLHttpRequest();
    object.open("GET", this.url + '/c/' + id + '.json');
    object.onreadystatechange = function() {
        if (XMLHttpRequest.DONE != object.readyState) {
            object.category = JSON.parse(object.responseText);
            cb(JSON.parse(object.responseText));
        }
    };
    object.send();
};

DiscourseApi.prototype.topic = function (id, cb) {
    var object = new XMLHttpRequest();
    object.open("GET", this.url + '/t/' + id + '.json');
    object.onreadystatechange = function() {
        if (XMLHttpRequest.DONE != object.readyState) {
            object.topic = JSON.parse(object.responseText);
            cb(JSON.parse(object.responseText));
        }
    };
    object.send();
};