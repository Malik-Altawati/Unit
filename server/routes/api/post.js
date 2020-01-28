const Post = require("./../../../controllers/posts.js");

const IncomingForm = require('formidable').IncomingForm;
const path = require('path')
const uniqueId = require('uuid'); 
 
// app.post('/upload', (req, res) => {
//     const form = new IncomingForm();
//     var user_id;
//     var post;
//     var link;
//     form.parse(req, function (err, fields, files) {
//         user_id = fields.user_id
//         post = fields.post_text

//         if (err) {
//             res.send(err)
//         }
//         res.end();
//     });

//     form.on('fileBegin', function (name, file) {
//         var id = uniqueId()
//         file.path = 'folders/uploaded/' + id + "." + file.name.split(".")[1];
//         console.log(path.join(__dirname, "/../Unit/folders/uploaded/", id + "." + file.name.split(".")[1]))
//         link = path.join(__dirname, "/../Unit/folders/uploaded/", id + "." + file.name.split(".")[1])
//     });

//     form.on('end', (err, data) => {
//         console.log("done")
//         console.log(user_id, post, link)
//     })
// });
function createPost(req, res) {

    const form = new IncomingForm();
    var user_id;
    var post;
    var link;
    form.parse(req, function (err, fields, files) {
        user_id = fields.user_id
        post = fields.post_text

        if (err) {
            res.send(err)
        }
        res.end();
    });

    form.on('fileBegin', function (name, file) {
        res.end();
        var id = uniqueId()
        file.path = 'folders/uploaded/' + id + "." + file.name.split(".")[1];
        console.log(path.join(__dirname, "/../../../Unit/folders/uploaded/", id + "." + file.name.split(".")[1]))
        link = path.join(__dirname, "/../../../Unit/folders/uploaded/", id + "." + file.name.split(".")[1])
    });
   
    form.on('end', (err, data) => {
        console.log("done")
        console.log(user_id, post, link)
    })


    // let postObj = { post : req.body.post, link : req.body.link, user_id : req.body.user_id};
    // Post.create(postObj).then(data => {
    //     if (data) {
    //         return res.send('Post created')
    //     }
    // })
    // .catch(err => {
    //     if (err) {
    //         console.error(err)
    //     }
    // })
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