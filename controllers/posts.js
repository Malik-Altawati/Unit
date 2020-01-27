
const Post = require('../models/posts')

function createPost(postObj) {
    var post= postObj.post
    var link = postObj.link
    var user_id = postObj.user_id
    return Post.create(post, link, user_id)
        .then(data => {
            return "post created successfully"
        })
        .catch(err => {
            throw "Error";
        })

}

function findPost(user_id) {
    return Post.find(user_id)
        .then(data => {
            return data
        })
        .catch(err => {
            throw "post not Found"
        })

}

function updatePost(post, id, user_id) {
    return Post.update(post, id, user_id)
        .then(data => {
            return "post was updated"
        })
        .catch(err => {
            throw "post not found"
        })
}

function deletePost(id, user_id) {
    return Post.delete(id, user_id)
        .then(data => {
            return "post was deleted"
        })
        .catch(err => {
            throw "post not found"
        })
}

module.exports.create = createPost;
module.exports.find = findPost;
module.exports.delete = deletePost;
module.exports.update = updatePost;