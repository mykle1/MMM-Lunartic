/* Magic Mirror
 * Module: MMM-Lunartic
 *
 * By Mykle1
 *
 */
Module.register("MMM-Lunartic", {

    // Module config defaults.
    defaults: {
        mode: "rotating", // rotating or static
        image: "current", // animation, current, DayNight or static (phases image)
        useHeader: false, // true if you want a header
        header: "The Lunartic is in my head", // Any text you want. useHeader must be true
        maxWidth: "300px",
        distance: "miles", // miles or km
        sounds: "no", // for wolf howls, only on a full moon
        animationSpeed: 0,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 3 * 60 * 1000, // 15 minutes
        rotateInterval: 30 * 1000,

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
            es: "translations/es.json",
            de: "translations/de.json",
            sv: "translations/sv.json",
            nl: "translations/nl.json",
            gl: "translations/gl.json",
        };
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

            //  Set locale.


        this.url = "https://mykle.herokuapp.com/moon";
        this.Lunartic = {};
        this.info = {};
        this.activeItem = 0;
        this.rotateInterval = null;
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
        var image = this.config.image; // animation, current, DayNight or static

        // The image choices
        // moon animation
        var pic = document.createElement("div");
        var img = document.createElement("img");
            img.classList.add("photo");
        if (this.config.image == "animation") {
            img.src = "modules/MMM-Lunartic/pix/moon.gif";
            pic.appendChild(img);
            wrapper.appendChild(pic);

            // Current image from the US Navy
        } else if (this.config.image == "current") {
            img.src = "http://api.usno.navy.mil/imagery/moon.png?date=today&time=now";
            pic.appendChild(img);
            wrapper.appendChild(pic);

            // DayNight image from US Navy
        } else if (this.config.image == "DayNight") {
            img.src = "http://api.usno.navy.mil/imagery/earth.png?date=today";
            pic.appendChild(img);
            wrapper.appendChild(pic);

            // Static moon image
        } else if (this.config.image == "static") {
            img.src = "modules/MMM-Lunartic/pix/static.jpg";
            pic.appendChild(img);
            wrapper.appendChild(pic);
        }


        if (this.config.mode == "rotating") {
            // Rotating through the data objects
            var info = this.info;
            var keys = Object.keys(this.info);
            if (keys.length > 0) {
                if (this.activeItem >= keys.length) {
                    this.activeItem = 0;
                    //                    console.log(this.activeItem); // for checking
                }
                var info = info[info[this.activeItem]];


                if (this.activeItem == 0) {
                    // distance from Earth's core
                    var DFCOE = document.createElement("div");
                    DFCOE.classList.add("xsmall", "bright", "DFCOE");
                    if (this.config.distance == "miles") {
                        DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
                    } else {
                        DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
                    }
                    wrapper.appendChild(DFCOE);
                }

                if (this.activeItem == 1) {
                    // distance from the sun
                    var DFS = document.createElement("div");
                    DFS.classList.add("xsmall", "bright", "DFS");
                    if (this.config.distance == "miles") {
                        DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
                    } else {
                        DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
                    }
                    wrapper.appendChild(DFS);
                }

                if (this.activeItem == 2) {
                    // Next full moon date
                    var nextFullMoon = document.createElement("div");
                    if (config.language == "de") {
                        var dateTimeString = moment.unix(this.info[2].fm).format("DD MMM YYYY");
                    } else {
                        var dateTimeString = moment.unix(this.info[2].fm).format("MMM DD, YYYY");
                    }
                    nextFullMoon.classList.add("xsmall", "bright", "nextFullMoon");
                    //	console.log (Lunartic); // checking data


                //    console.log(this.info[2].fm * 1000); // unix timestamp of full moon from data
                //    console.log(new Date().valueOf()); // unix timestamp for right now
                    // compare date of next full moon to current date and time
                    if (this.info[2].fm * 1000 < new Date().valueOf()) {
                    nextFullMoon.innerHTML = this.translate("The last full moon was ") + dateTimeString;
                    wrapper.appendChild(nextFullMoon);
                  } else {
                    nextFullMoon.innerHTML = this.translate("The next full moon is ") + dateTimeString;
                    wrapper.appendChild(nextFullMoon);
              }

          }

                if (this.activeItem == 3) {
                    // Next new moon date
                    var nextNewMoon = document.createElement("div");
                    if (config.language == "de") {
                        var dateTimeString = moment.unix(this.info[3].nnm).format("DD MMM YYYY");
                    } else {
                        var dateTimeString = moment.unix(this.info[3].nnm).format("MMM DD, YYYY");
                    }
                    nextNewMoon.classList.add("xsmall", "bright", "nextNewMoon");
                    nextNewMoon.innerHTML = this.translate("The next new moon is ") + dateTimeString;
                    wrapper.appendChild(nextNewMoon);
                }

                if (this.activeItem == 4) {
                    // how old the current moon is
                    var age = document.createElement("div");
                    age.classList.add("xsmall", "bright", "age");
                    age.innerHTML = this.translate("The current moon is ") + Math.round(this.info[4].age) + this.translate(" days old");
                    wrapper.appendChild(age);
                }

                if (this.activeItem == 5) {
                    // how much of the moon is illuminated
                    var illumination = document.createElement("div");
                    illumination.classList.add("xsmall", "bright", "illumination");
                    illumination.innerHTML = this.translate("The moon is ") + Math.round(this.info[5].ill) + this.translate("% illuminated");
                    wrapper.appendChild(illumination);
                }

                if (this.activeItem == 6) {
                    // waxing, waning, etc..
                    var stage = document.createElement("div");
                    stage.classList.add("xsmall", "bright", "stage");

                    if (Math.round(this.info[5].ill) < 1 && this.info[6] == "waning") {
                        stage.innerHTML = this.translate("New Moon - No visible moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("New Moon - No visible moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) > 1 && Math.round(this.info[5].ill) < 50 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("Waxing Crescent Moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("First Quarter Half Moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) > 50 && Math.round(this.info[5].ill) < 100 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("Waxing Gibbous Moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) == 100 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("Full Moon");
                        wrapper.appendChild(stage);

                      // create audio, only on full moon, wolf howling
             			 if (this.config.sounds == "yes") {
             					var sound = new Audio();
             					sound.src = 'modules/MMM-Lunartic/sounds/wolf.mp3';
             					sound.loop = false;
             					sound.play();
             			  }

                    } else if (Math.round(this.info[5].ill) == 100 && this.info[6].stage == "waning") {
                        stage.innerHTML = this.translate("Full Moon");
                        wrapper.appendChild(stage);

                        // create audio, only on full moon, wolf howling
               			 if (this.config.sounds == "yes") {
               					var sound = new Audio();
               					sound.src = 'modules/MMM-Lunartic/sounds/wolf.mp3';
               					sound.loop = false;
               					sound.play();
               			  }

                    } else if (Math.round(this.info[5].ill) <= 100 && Math.round(this.info[5].ill) > 50 && this.info[6].stage == "waning") {
                        stage.innerHTML = this.translate("Waning Gibbous Moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waning") {
                        stage.innerHTML = this.translate("Third Quarter Half Moon");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) < 50 && Math.round(this.info[5].ill) >= 1 && this.info[6].stage == "waning") {
                        stage.innerHTML = this.translate("Waning Crescent Moon");
                        wrapper.appendChild(stage);

                    }  else if (Math.round(this.info[5].ill) < 1) {
                        stage.innerHTML = this.translate("New Moon - No visible moon");
                        wrapper.appendChild(stage);
                    }
                }

            } // <-- end of rotating mode



          // static display
        } else if (this.config.mode == "static") {

            // distance from Earth's core
            var DFCOE = document.createElement("div");
                DFCOE.classList.add("xsmall", "bright", "DFCOE");
            if (this.config.distance == "miles") {
                DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
            } else {
                DFCOE.innerHTML = this.translate("Distance from Earth's core = ") + (Math.round(this.info[0].dfcoe) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
            }
            wrapper.appendChild(DFCOE);


            // distance from the sun
            var DFS = document.createElement("div");
                DFS.classList.add("xsmall", "bright", "DFS");
            if (this.config.distance == "miles") {
                DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs * 0.62137) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " miles";
            } else {
                DFS.innerHTML = this.translate("Distance from sun = ") + (Math.round(this.info[1].dfs) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,') + " km";
            }
            wrapper.appendChild(DFS);


            // Next full moon date
            var nextFullMoon = document.createElement("div");
            if (config.language == "de") {
                var dateTimeString = moment.unix(this.info[2].fm).format("DD MMM YYYY");
            } else {
                var dateTimeString = moment.unix(this.info[2].fm).format("MMM DD, YYYY");
            }
            nextFullMoon.classList.add("xsmall", "bright", "nextFullMoon");
            //	console.log (Lunartic); // checking data


            // Because next FM data doesn't occur till after the new moon
            if (this.info[2].fm * 1000 < new Date().valueOf()) {
                nextFullMoon.innerHTML = this.translate("The last full moon was ") + dateTimeString;
                wrapper.appendChild(nextFullMoon);
            } else {
                nextFullMoon.innerHTML = this.translate("The next full moon is ") + dateTimeString;
                wrapper.appendChild(nextFullMoon);
            }


            // Next new moon date
            var nextNewMoon = document.createElement("div");
            if (config.language == "de") {
                var dateTimeString = moment.unix(this.info[3].nnm).format("DD MMM YYYY");
            } else {
                var dateTimeString = moment.unix(this.info[3].nnm).format("MMM DD, YYYY");
            }
            nextNewMoon.classList.add("xsmall", "bright", "nextNewMoon");
            nextNewMoon.innerHTML = this.translate("The next new moon is ") + dateTimeString;
            wrapper.appendChild(nextNewMoon);


            // how old the current moon is
            var age = document.createElement("div");
            age.classList.add("xsmall", "bright", "age");
            age.innerHTML = this.translate("The current moon is ") + Math.round(this.info[4].age) + this.translate(" days old");
            wrapper.appendChild(age);


            // how much of the moon is illuminated
            var illumination = document.createElement("div");
            illumination.classList.add("xsmall", "bright", "illumination");
            illumination.innerHTML = this.translate("The moon is ") + Math.round(this.info[5].ill) + this.translate("% illuminated");
            wrapper.appendChild(illumination);


            // waxing, waning, etc..
            var stage = document.createElement("div");
                stage.classList.add("xsmall", "bright", "stage");

            if (Math.round(this.info[5].ill) < 1 && Lunartic.stage == "waning") {
                stage.innerHTML = this.translate("New Moon - No visible moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("New Moon - No visible moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) > 1 && Math.round(this.info[5].ill) < 50 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("Waxing Crescent Moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("First Quarter Half Moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) > 50 && Math.round(this.info[5].ill) < 100 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("Waxing Gibbous Moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) == 100 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("Full Moon");
                wrapper.appendChild(stage);

                // create audio, only on full moon, wolf howling
             if (this.config.sounds == "yes") {
                var sound = new Audio();
                sound.src = 'modules/MMM-Lunartic/sounds/wolf.mp3';
                sound.loop = false;
                sound.play();
              }

            } else if (Math.round(this.info[5].ill) == 100 && this.info[6].stage == "waning") {
                stage.innerHTML = this.translate("Full Moon");
                wrapper.appendChild(stage);

                // create audio, only on full moon, wolf howling
             if (this.config.sounds == "yes") {
                var sound = new Audio();
                sound.src = 'modules/MMM-Lunartic/sounds/wolf.mp3';
                sound.loop = false;
                sound.play();
              }

            } else if (Math.round(this.info[5].ill) <= 100 && Math.round(this.info[5].ill) > 50 && this.info[6].stage == "waning") {
                stage.innerHTML = this.translate("Waning Gibbous Moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waning") {
                stage.innerHTML = this.translate("Third Quarter Half Moon");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) < 50 && Math.round(this.info[5].ill) >= 1 && this.info[6].stage == "waning") {
                stage.innerHTML = this.translate("Waning Crescent Moon");
                wrapper.appendChild(stage);

            }  else if (Math.round(this.info[5].ill) < 1) {
                stage.innerHTML = this.translate("New Moon - No visible moon");
                wrapper.appendChild(stage);
            }

        } // end of static mode


        return wrapper;
    },


    /////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_MOON') {
            this.hide(1000);
            //    this.updateDom(300);
        } else if (notification === 'SHOW_MOON') {
            this.show(1000);
            //   this.updateDom(300);
        }

    },


    processLunartic: function(data) {
        this.info = data;
  //   console.log(this.info); // for checking
        this.loaded = true;
    },

    scheduleCarousel: function() {
        console.log("Carousel of Lunartic fucktion");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getLunartic();
        }, this.config.updateInterval);
        this.getLunartic(this.config.initialLoadDelay);
        var self = this;
    },

    getLunartic: function() {
        this.sendSocketNotification('GET_LUNARTIC'); // , this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "LUNARTIC_RESULT") {
            this.processLunartic(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});
