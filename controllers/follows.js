
const FollowController = require('../models/follows')
/*
module.exports.getfollowres = getfollowers;
module.exports.follow = follow;
module.exports.unfollow = unfollow;

*/
function followUser(obj) {
    return FollowController.follow(user)
        .then(data => {
            return data
        })
        .catch(err => {
            throw "user not Found"
        })


}

function unFollowUser(obj) {


}


function getUserFollowers(obj) {

}

module.exports.follow = followUser;
module.exports.find = getUserFollowers;
module.exports.unfollow = unFollowUser;
