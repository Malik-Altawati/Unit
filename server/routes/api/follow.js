const FollowUp = require("./../../../controllers/follows.js");

function follow(req, res) {
  FollowUp.follow(req.body)
    .then(data => {
      if (data.rowCount > 0) {
        return res.json("Its working");
      }
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });
}

function unfollow(req, res) {
  FollowUp.unfollow(req.body)
    .then(data => {
      return res.json("Its working");
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });
}

function getfollowers(req, res) {
  FollowUp.find(req.body)
    .then(data => {
      return res.send(data.rows);
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });
}

function getInfoOfFollowers(req, res) {
  FollowUp.getfollowersInfo()
    .then(data => {
      return res.send(data.rows);
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });
}
function getfollowingList(req, res) {
  FollowUp.getfollowingList()
    .then(data => {
      return res.send(data.rows);
    })
    .catch(err => {
      if (err) {
        console.error(err);
      }
    });
}


module.exports.create = follow;
module.exports.delete = unfollow;
module.exports.getfollowers = getfollowers;
module.exports.getInfoOfFollowers = getInfoOfFollowers;
module.exports.getfollowingList = getfollowingList;
