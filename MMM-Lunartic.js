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
            ca: "translations/ca.json",
            de: "translations/de.json",
            sv: "translations/sv.json",
            nl: "translations/nl.json"
        };
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

            //  Set locale.
  //      this.url = this.getUrl();
        this.Lunartic = {};
        this.moon = {};
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


///////////////////////// Temporary till API is fixed ///////////////////// Start

          if (Math.round(this.info[5].ill) < 1 && this.info[6] == "waning") {
             img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 1 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres1.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 2 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres2.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 3 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 4 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 5 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres5.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }


            if (Math.round(this.info[5].ill) == 6 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres6.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 7 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 8 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 9 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 10 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxcres10.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 11 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres11.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 12 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 13 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 14 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 15 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 16 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxcres16.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }


            if (Math.round(this.info[5].ill) == 17 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres17.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 18 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres18.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 19 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 20 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 21 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 22 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 23 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxcres23.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }


            if (Math.round(this.info[5].ill) == 24 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres24.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 25 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres26.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }


           if (Math.round(this.info[5].ill) == 26 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres26.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 27 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 28 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 29 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 30 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 31 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 32 && this.info[6].stage == "waxing") {
        img.src = "modules/MMM-Lunartic/pix/waxcres32.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

            if (Math.round(this.info[5].ill) == 33 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres33.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 34 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres35.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 35 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres35.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }



            if (Math.round(this.info[5].ill) == 36 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }


           if (Math.round(this.info[5].ill) == 37 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 38 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 39 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 40 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 41 && this.info[6].stage == "waxing") {
        img.src = "modules/MMM-Lunartic/pix/waxcres41.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

            if (Math.round(this.info[5].ill) == 42 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres42.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 43 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }
           if (Math.round(this.info[5].ill) == 44 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 45 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 46 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres46.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 47 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 48 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 49 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxcres50.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 51 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 52  && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 53  && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 54  && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib52.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 55 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 56 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 57 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 58 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib56.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 59 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib60.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 60 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib60.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 61 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 62 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 63 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 64 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib62.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 65 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 66 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 67 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 68 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib67.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 69  && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib69.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 70  && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib69.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 71 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 72 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 73 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 74 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 75 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxgib72.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 76 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib77.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 77 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib77.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 78 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 79 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 80 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib78.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 81 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 82 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 83 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 84 && this.info[6].stage == "waxing") {
          img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }
        if (Math.round(this.info[5].ill) == 85 && this.info[6].stage == "waxing") {
         img.src = "modules/MMM-Lunartic/pix/waxgib82.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 86 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib86.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 87  && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 88  && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 89  && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib87.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 90 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 91 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 92 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib90.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 93 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 94 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 95 && this.info[6].stage == "waxing") {
           img.src = "modules/MMM-Lunartic/pix/waxgib93.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 96 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib96.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 97 && this.info[6].stage == "waxing") {
            img.src = "modules/MMM-Lunartic/pix/waxgib96.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 98 && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib98.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 99  && this.info[6].stage == "waxing") {
             img.src = "modules/MMM-Lunartic/pix/waxgib99.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 100) {
             img.src = "modules/MMM-Lunartic/pix/fm.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 100  && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/fm.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 99 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 98 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 97 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib98.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 96 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 95 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 94 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib96.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 93 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib93.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 92  && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 91  && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 90  && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib92.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 89  && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 88  && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 87  && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib89.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 86  && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib86.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 85  && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 84  && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 83  && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 82  && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib85.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 81 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 80 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 79 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 78 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib81.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 77 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib77.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 76 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 75 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 74 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 73 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 72 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanegib75.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 71 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 70 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 69 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 68 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib71.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 67 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 66 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 65 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 64 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 63 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 62 && this.info[6].stage == "waning") {
        img.src = "modules/MMM-Lunartic/pix/wanegib67.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

            if (Math.round(this.info[5].ill) == 61 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 60 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 59 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 58 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 57 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanegib60.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 56 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib56.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 55 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib56.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

            if (Math.round(this.info[5].ill) == 54 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 53 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 52 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 51 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 50 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanegib54.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

            if (Math.round(this.info[5].ill) == 49 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres49.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 48 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 47 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 46 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 45 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres45.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 44 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres44.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 43 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 42 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 41 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 40 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 39 && this.info[6].stage == "waning") {
        img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

            if (Math.round(this.info[5].ill) == 38 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres38.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 37 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 36 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 35 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

            if (Math.round(this.info[5].ill) == 34 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres34.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 33 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 32 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 31 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 30 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 29 && this.info[6].stage == "waning") {
        img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

            if (Math.round(this.info[5].ill) == 28 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres28.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 27 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 26 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

            if (Math.round(this.info[5].ill) == 25 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres25.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

            if (Math.round(this.info[5].ill) == 24 && this.info[6].stage == "waning") {
             img.src = "modules/MMM-Lunartic/pix/wanecres24.png";
             pic.appendChild(img);
             wrapper.appendChild(pic);
           }

           if (Math.round(this.info[5].ill) == 23 && this.info[6].stage == "waning") {
            img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
            pic.appendChild(img);
            wrapper.appendChild(pic);
          }

          if (Math.round(this.info[5].ill) == 22 && this.info[6].stage == "waning") {
           img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
           pic.appendChild(img);
           wrapper.appendChild(pic);
         }

         if (Math.round(this.info[5].ill) == 21 && this.info[6].stage == "waning") {
          img.src = "modules/MMM-Lunartic/pix/wanecres20.png";
          pic.appendChild(img);
          wrapper.appendChild(pic);
        }

        if (Math.round(this.info[5].ill) == 20 && this.info[6].stage == "waning") {
         img.src = "modules/MMM-Lunartic/pix/wanecres19.png";
         pic.appendChild(img);
         wrapper.appendChild(pic);
       }

       if (Math.round(this.info[5].ill) == 19 && this.info[6].stage == "waning") {
        img.src = "modules/MMM-Lunartic/pix/wanecres19.png";
        pic.appendChild(img);
        wrapper.appendChild(pic);
      }

      if (Math.round(this.info[5].ill) == 18 && this.info[6].stage == "waning") {
       img.src = "modules/MMM-Lunartic/pix/wanecres17.png";
       pic.appendChild(img);
       wrapper.appendChild(pic);
     }

     if (Math.round(this.info[5].ill) == 17 && this.info[6].stage == "waning") {
      img.src = "modules/MMM-Lunartic/pix/wanecres17.png";
      pic.appendChild(img);
      wrapper.appendChild(pic);
    }

    if (Math.round(this.info[5].ill) == 16 && this.info[6].stage == "waning") {
     img.src = "modules/MMM-Lunartic/pix/wanecres15.png";
     pic.appendChild(img);
     wrapper.appendChild(pic);
   }

   if (Math.round(this.info[5].ill) == 15 && this.info[6].stage == "waning") {
    img.src = "modules/MMM-Lunartic/pix/wanecres15.png";
    pic.appendChild(img);
    wrapper.appendChild(pic);
  }

  if (Math.round(this.info[5].ill) == 14 && this.info[6].stage == "waning") {
   img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
   pic.appendChild(img);
   wrapper.appendChild(pic);
 }

 if (Math.round(this.info[5].ill) == 13 && this.info[6].stage == "waning") {
  img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
  pic.appendChild(img);
  wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 12 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres12.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 11 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres10.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 10 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres10.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 9 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres8.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 8 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres8.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 7 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres6.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 6 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres6.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 5 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres5.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 4 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres3.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 3 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres3.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 2 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres2.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}

if (Math.round(this.info[5].ill) == 1 && this.info[6].stage == "waning") {
 img.src = "modules/MMM-Lunartic/pix/wanecres1.png";
 pic.appendChild(img);
 wrapper.appendChild(pic);
}


if (Math.round(this.info[5].ill) < 1 && this.info[6] == "waning") {
   img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
   pic.appendChild(img);
   wrapper.appendChild(pic);
 }

  if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
   img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
   pic.appendChild(img);
   wrapper.appendChild(pic);
 }

 if (Math.round(this.info[5].ill) == 0) {
  img.src = "modules/MMM-Lunartic/pix/nm.png"; // ("New Moon");
  pic.appendChild(img);
  wrapper.appendChild(pic);
}

// console.log(img.src);


  ///////////////////////// Temporary till API is fixed ///////////////////// END

        // if (this.config.image == "animation") {
        //     img.src = "modules/MMM-Lunartic/pix/moon.gif";
        //     pic.appendChild(img);
        //     wrapper.appendChild(pic);
        //
        //     // Current image from the US Navy
        // } else if (this.config.image == "current") {
        //     img.src = "https://api.usno.navy.mil/imagery/moon.png?date=today&time=now";
        //     pic.appendChild(img);
        //     wrapper.appendChild(pic);
        //
        //     // DayNight image from US Navy
        // } else if (this.config.image == "DayNight") {
        //     img.src = "https://api.usno.navy.mil/imagery/earth.png?date=today";
        //     pic.appendChild(img);
        //     wrapper.appendChild(pic);
        //
        //     // Static moon image
        // } else if (this.config.image == "static") {
        //     img.src = "modules/MMM-Lunartic/pix/static.jpg";
        //     pic.appendChild(img);
        //     wrapper.appendChild(pic);
        // }


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
                        stage.innerHTML = this.translate("New Moon Phase");
                        wrapper.appendChild(stage);

                    } else if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
                        stage.innerHTML = this.translate("New Moon Phase");
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
                        stage.innerHTML = this.translate("New Moon Phase");
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
                stage.innerHTML = this.translate("New Moon Phase");
                wrapper.appendChild(stage);

            } else if (Math.round(this.info[5].ill) < 1 && this.info[6].stage == "waxing") {
                stage.innerHTML = this.translate("New Moon Phase");
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
                stage.innerHTML = this.translate("New Moon Phase");
                wrapper.appendChild(stage);
            }

        } // end of static mode


        return wrapper;
    },

 //    getUrl: function() {
 //    var url = null;
 //    var mType = this.config.image;
 //
 //   if (mType == "current") {
 //     url = "https://api.usno.navy.mil/imagery/moon.png";
 //   } else if (mType == "DayNight") {
 //     url = "https://api.usno.navy.mil/imagery/earth.png";
 //   }
 //   else {
 //     console.log("Error can't get Moon url" + response.statusCode);
 //   }
 //   return url;
 // },



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
     console.log(this.info); // for checking
        this.loaded = true;
    },


        processMOON: function(data) {
            this.moon = data;
//       console.log(this.moon); // for checking

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
        this.sendSocketNotification('GET_MOON', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "LUNARTIC_RESULT") {
            this.processLunartic(payload);
          }
          if (notification === "MOON_RESULT") {
              this.processMOON(payload);
            }
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);

        this.updateDom(this.config.initialLoadDelay);
    },
});
