const FollowController = require("../models/follows");

function followUser(obj) {
  var follower_id = obj.follower_id;
  var followed_id = obj.followed_id;
  return FollowController.follow(follower_id, followed_id)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw "following failed";
    });
}

function unFollowUser(obj) {
  var follower_id = obj.follower_id;
  var followed_id = obj.followed_id;
  return FollowController.unfollow(follower_id, followed_id)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw "unfollowing failed";
    });
}

function getUserFollowers(obj) {
  var followed_id = obj.followed_id;
  return FollowController.getfollowres(followed_id)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw "could not get followers";
    });
}

function getfollowersInfo() {
  return FollowController.getfollowersInfo()
    .then(data => {
      return data;
    })
    .catch(err => {
      throw "could not get followers";
    });
}

module.exports.follow = followUser;
module.exports.find = getUserFollowers;
module.exports.unfollow = unFollowUser;

module.exports.getfollowersInfo = getfollowersInfo;
