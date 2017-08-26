/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
Module.register("MMM-Lunartic", {

    // Module config defaults.
    defaults: {
	image: "animation", // animation or static (picture)
        useHeader: false, // true if you want a header      
        header: "The Lunartic is in my head", // Any text you want. useHeader must be true
        maxWidth: "300px",
        distance: "miles", // miles or km
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 60 * 1000, // 1 minute

    },

    getStyles: function() {
        return ["MMM-Lunartic.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },
    
    getTranslations: function() {
        return {
            en: "translations/en.json",
            fr: "translations/fr.json"
        };
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
            wrapper.innerHTML = this.translate("When the Moon hits your eye . . .");
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
        var distance = this.config.distance; // miles or km
	var image = this.config.image;       // animation or static

        var top = document.createElement("div");
        top.classList.add("list-row");


		// moon animation
		var pic = document.createElement("div");
		var img = document.createElement("img");
		img.classList.add("photo");
	if (this.config.image == "animation") {
		img.src = "modules/MMM-Lunartic/pix/moon.gif";
		pic.appendChild(img);
		wrapper.appendChild(pic);
	} else {
		img.src = "modules/MMM-Lunartic/pix/static.jpg";
		pic.appendChild(img);
		wrapper.appendChild(pic);
	}


            // distance from Earth's core
            var DFCOE = document.createElement("div");
            DFCOE.classList.add("xsmall", "bright", "DFCOE");
        if (this.config.distance == "miles") {
            DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(Lunartic.DFCOE * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
        } else {
            DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(Lunartic.DFCOE) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
        }
        wrapper.appendChild(DFCOE);


            // distance from the sun
            var DFS = document.createElement("div");
            DFS.classList.add("xsmall", "bright", "DFS");
        if (this.config.distance == "miles") {
            DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(Lunartic.DFS * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
        } else {
            DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(Lunartic.DFS) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
        }
        wrapper.appendChild(DFS);


        // Next full moon date
        var nextFullMoon = document.createElement("div");
        var dateTimeString = moment.unix(Lunartic.FM.UT).format("MMM DD, YYYY");
        nextFullMoon.classList.add("xsmall", "bright", "nextFullMoon");
        //	console.log (Lunartic); // checking data
        nextFullMoon.innerHTML = this.translate("The next full moon is ") + dateTimeString;
        wrapper.appendChild(nextFullMoon);


        // Next new moon date
        var nextNewMoon = document.createElement("div");
        var dateTimeString = moment.unix(Lunartic.NNM.UT).format("MMM DD, YYYY");
        nextNewMoon.classList.add("xsmall", "bright", "nextNewMoon");
        nextNewMoon.innerHTML = this.translate("The next new moon is ") + dateTimeString;
        wrapper.appendChild(nextNewMoon);


        // how old the current moon is
        var age = document.createElement("div");
        age.classList.add("xsmall", "bright", "age");
        age.innerHTML = this.translate("The current moon is ") + Math.round(Lunartic.age) + this.translate(" days old");
        wrapper.appendChild(age);


        // how much of the moon is illuminated
        var illumination = document.createElement("div");
        illumination.classList.add("xsmall", "bright", "illumination");
        illumination.innerHTML = this.translate(" The moon is ") + Math.round(Lunartic.illumination) + this.translate("% illuminated");
        wrapper.appendChild(illumination);


        // waxing, waning, etc..
        var stage = document.createElement("div");
        stage.classList.add("xsmall", "bright", "stage");
        stage.innerHTML = this.translate("The moon is ") + this.translate(Lunartic.stage);
        wrapper.appendChild(stage);

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
