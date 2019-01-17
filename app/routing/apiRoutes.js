var path = require("path");

module.exports = function (app){
    var friendsList = [];
    var bestMatches = [];
    
   
    app.get("/api/friends", function(req, res) {
    res.json(friendsList);
    });

    app.post("/api/friends",  function(req, res){
    var currentFriend = req.body;
        


        var friendDifferences = [];

        if (friendsList.length >= 1){
            bestMatch = {};
            bestDiff = 100;
            for (let i in friendsList) {
                totalDiff = 0;
                
                for (let j in currentFriend.scores) {
                    totalDiff += Math.abs(currentFriend.scores[j]-friendsList[i].scores[j]);
                }
                if (bestDiff > totalDiff) {
                    bestDiff = totalDiff;
                    bestMatch = friendsList[i];
                }
            }
            bestMatches.push([currentFriend, bestMatch]);
            res.json(bestMatch);
        } else {        
            res.json(currentFriend);
        }

        friendsList.push(currentFriend);
        
    });
};