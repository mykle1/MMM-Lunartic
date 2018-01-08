/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
Module.register("MMM-Lunartic", {

    // Module config defaults.
    defaults: {
	    image: "animation",       // animation, current, DayNight or static (phases image)
        useHeader: false,         // true if you want a header      
        header: "The Lunartic is in my head", // Any text you want. useHeader must be true
        maxWidth: "300px",
        distance: "miles",        // miles or km
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
            fr: "translations/fr.json",
            de: "translations/de.json"
        };
    },
    
    

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "https://mykle.herokuapp.com/moon";
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
	    var image = this.config.image;           // animation, current or static

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
		
	} else if (this.config.image == "current") {	
		img.src = "http://api.usno.navy.mil/imagery/moon.png?date=today&time=now";
		pic.appendChild(img);
		wrapper.appendChild(pic);
		
	} else if (this.config.image == "DayNight") {	
		img.src = "http://api.usno.navy.mil/imagery/earth.png?date=today";
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
        if (config.language == "de") {
        	var dateTimeString = moment.unix(Lunartic.FM.UT).format("DD MMM YYYY");
	}else {
        	var dateTimeString = moment.unix(Lunartic.FM.UT).format("MMM DD, YYYY");
	}
        nextFullMoon.classList.add("xsmall", "bright", "nextFullMoon");
        //	console.log (Lunartic); // checking data
		
		// Because next FM data doesn't occur till after the new moon
		if (moment().unix() > moment(Lunartic.FM.UT).add(15, 'd')){
			nextFullMoon.innerHTML = this.translate("The next full moon is ") + dateTimeString;
			wrapper.appendChild(nextFullMoon);
		} else {
	        nextFullMoon.innerHTML = this.translate("The last full moon was ") + dateTimeString;
			wrapper.appendChild(nextFullMoon);
		}

        // Next new moon date
        var nextNewMoon = document.createElement("div");
        if (config.language == "de") {
        	var dateTimeString = moment.unix(Lunartic.NNM.UT).format("DD MMM YYYY");
	}else {
        	var dateTimeString = moment.unix(Lunartic.NNM.UT).format("MMM DD, YYYY");
	}
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
        illumination.innerHTML = this.translate("The moon is ") + Math.round(Lunartic.illumination) + this.translate("% illuminated");
        wrapper.appendChild(illumination);


        // waxing, waning, etc..
        var stage = document.createElement("div");
        stage.classList.add("xsmall", "bright", "stage");
		
		if (Math.round(Lunartic.illumination) < 1 && Lunartic.stage == "waning") {
			stage.innerHTML = this.translate("New Moon Phase");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) < 1 && Lunartic.stage == "waxing") {
			stage.innerHTML = this.translate("New Moon Phase");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) > 1 && Math.round(Lunartic.illumination) < 50 && Lunartic.stage == "waxing") {
			stage.innerHTML = this.translate("Waxing Crescent Moon");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) == 50 && Lunartic.stage == "waxing") {
			stage.innerHTML = this.translate("First Quarter Half Moon");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) > 50 && Math.round(Lunartic.illumination) < 100 && Lunartic.stage == "waxing") {
			stage.innerHTML = this.translate("Waxing Gibbous Moon");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) == 100 && Lunartic.stage == "waxing") {
			stage.innerHTML = this.translate("Full Moon");
			wrapper.appendChild(stage);
		
		} else if (Math.round(Lunartic.illumination) == 100 && Lunartic.stage == "waning") {
			stage.innerHTML = this.translate("Full Moon");
			wrapper.appendChild(stage);
			
		} else if (Math.round(Lunartic.illumination) <= 100 && Math.round(Lunartic.illumination) > 50 && Lunartic.stage == "waning") {
			stage.innerHTML = this.translate("Waning Gibbous Moon");
			wrapper.appendChild(stage);
		
		} else if (Math.round(Lunartic.illumination) == 50 && Lunartic.stage == "waning") {
			stage.innerHTML = this.translate("Third Quarter Half Moon");
			wrapper.appendChild(stage);
		
		} else if (Math.round(Lunartic.illumination) < 50 && Math.round(Lunartic.illumination) >= 1 && Lunartic.stage == "waning") {
			stage.innerHTML = this.translate("Waning Crescent Moon");
			wrapper.appendChild(stage);
			
		}
		
        return wrapper;
    },
    
    
    /////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_MOON') {
            this.hide(1000);
        //    this.updateDom(300);
        }  else if (notification === 'SHOW_MOON') {
            this.show(1000);
        //   this.updateDom(300);
        }
            
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
