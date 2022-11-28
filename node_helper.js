/* MagicMirror²
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
const NodeHelper = require("node_helper");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },


    getLunartic: function(url) {
        fetch("https://mykle.herokuapp.com/moon")
            .then(response => response.json())
            .then(json => {
//                console.log(json); // for checking

                // create array
                var data = [];
                // set vars
                var dfcoe  =  json.DFCOE ;
                var dfs  =  json.DFS;
                var fm  = json.FM.UT;
                var nnm  = json.NNM.UT;
                var age  = json.age;
                var ill  = json.illumination;
                var stage  = json.stage;

                // Make each into an object so they can be put into a rotation courtesy of @cowboysdude
                dfcoe  =  {dfcoe};
                dfs = {dfs};
                fm = {fm};
                nnm = {nnm};
                age = {age};
                ill = {ill};
                stage = {stage};

                data.push(dfcoe,dfs,fm,nnm,age,ill,stage); // push the data
//               console.log(response.statusCode + data); // for checking
                this.sendSocketNotification("LUNARTIC_RESULT", data);
        });
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_LUNARTIC") {
            this.getLunartic(payload);
        }
    }
});
