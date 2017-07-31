/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
Module.register("MMM-Lunartic", {

    // Module config defaults.
    defaults: {
        useHeader: false, // true if you want a header      
        header: "The Lunartic is in my head", // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 60 * 1000, // 1 minute

    },

    getStyles: function() {
        return ["MMM-Lunartic.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "http://api.burningsoul.in/moon";
        this.Lunartic = {};
        this.scheduleUpdate();
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "When the Moon hits your eye . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var Lunartic = this.Lunartic;

        var top = document.createElement("div");
        top.classList.add("list-row");


        // moon gif
        var pic = document.createElement("div");
        var img = document.createElement("img");
        img.classList.add("photo");
        img.src = "modules/MMM-Lunartic/pix/moon.gif";
        pic.appendChild(img);
        wrapper.appendChild(pic);


        // how old the new moon is
        var age = document.createElement("div");
        age.classList.add("xsmall", "bright", "age");
        age.innerHTML = "This month's moon is " + Math.round(Lunartic.age) + " days old";
        wrapper.appendChild(age);


        // how much of the moon is illuminated
        var illumination = document.createElement("div");
        illumination.classList.add("xsmall", "bright", "illumination");
        illumination.innerHTML = " The moon is " + Math.round(Lunartic.illumination) + "% illuminated";
        wrapper.appendChild(illumination);


        // waxing, waning, etc..
        var stage = document.createElement("div");
        stage.classList.add("xsmall", "bright", "stage");
        stage.innerHTML = "The moon is " + Lunartic.stage;
        wrapper.appendChild(stage);


        // distance from Earth's core
        var DFCOE = document.createElement("div");
        DFCOE.classList.add("xsmall", "bright", "DFCOE");
        DFCOE.innerHTML = "Distance from Earth's core = " + (Math.round(Lunartic.DFCOE * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
        wrapper.appendChild(DFCOE);


        // distance from the sun
        var DFS = document.createElement("div");
        DFS.classList.add("xsmall", "bright", "DFS");
        DFS.innerHTML = "Distance from sun = " + (Math.round(Lunartic.DFS * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
        wrapper.appendChild(DFS);


        // Next full moon date and time
        var nextFullMoon = document.createElement("div");
        nextFullMoon.classList.add("xsmall", "bright", "nextFullMoon");
        //	console.log (Lunartic); // checking data
        nextFullMoon.innerHTML = "The next full moon is " + Lunartic.FM.DT;
        wrapper.appendChild(nextFullMoon);


        // Next new moon date and time
        var nextNewMoon = document.createElement("div");
        nextNewMoon.classList.add("xsmall", "bright", "nextNewMoon");
        nextNewMoon.innerHTML = "The next new moon is " + Lunartic.NNM.DT;
        wrapper.appendChild(nextNewMoon);

        return wrapper;
    },


    processLunartic: function(data) {
        this.today = data.Today;
        this.Lunartic = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getLunartic();
        }, this.config.updateInterval);
        this.getLunartic(this.config.initialLoadDelay);
    },

    getLunartic: function() {
        this.sendSocketNotification('GET_LUNARTIC', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "LUNARTIC_RESULT") {
            this.processLunartic(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});