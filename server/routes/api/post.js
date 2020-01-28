const Post = require("./../../../controllers/posts.js");

function createPost(req, res) {
    let postObj = { post : req.body.post, link : req.body.link, user_id : req.body.user_id};
    Post.create(postObj).then(data => {
        if (data) {
            return res.send('Post created')
        }
    })
    .catch(err => {
        if (err) {
            console.error(err)
        }
    })
}


function findPost(req, res) {
    let { user_id } = req.body
    Post.find(user_id).then(data => {
        if (data) {
            return res.send(data)
        } 
    })
        .catch(err => {
            if (err) {
                console.error(err)
            }
        })
}

function updatePost(req, res) {
    let { post , user_id } = req.body;
    let id = req.params.id;
    Post.update(post , id, user_id).then(data => {
        if (data) {
            return res.send(data)
        } 
    })
        .catch(err => {
            if (err) {
                console.error(err)
            }
        })
}

function deletePost(req, res) {
    let { user_id } = req.body;
    let id = req.params.id;
    Post.delete(id, user_id).then(data => {
        if (data) {
            return res.send('Deleted');
        }
    })
        .catch(err => {
            if (err) {
                console.error(err)
            }
        })
}

module.exports.create = createPost;
module.exports.find = findPost;
module.exports.delete = deletePost;
module.exports.update = updatePost;