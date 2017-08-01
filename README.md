## MMM-Lunartic

Up to the minute information about our Lunar partner, with a splash of EyeCandy, to boot!

## How it works

First, a rather impressive animation of the night moon, with clouds rolling by.

Then you are offered updated information every minute, such as:

* The distance of the moon from the Earth's core at this moment. (Ever changing)
* This distance of the moon to the sun at this moment. (Ever changing)
* The date of the next full moon. (Very important if you're a werewolf!)
* The date of the next new moon. (Also very important if you're a werewolf!)
* The age of the current moon's phase. 
* How much of the moon is illuminated at this moment.
* The stage of the present moon (waning, waxing, etc..) 

## Examples

The moon will be animated. See picture below.

![](pix/33.JPG)

* The animation can be hidden if only the information is wanted.

![](pix/moon.gif) * This can be hidden

![](pix/11.JPG) * To show only this

* Annotated .css file included for aligning and coloring text and header.

## Installation

* `git clone https://github.com/mykle1/MMM-Lunartic` into the `~/MagicMirror/modules` directory.

* No API key needed! No dependencies needed! No kidding!


## Config.js entry and options

    {
        module: 'MMM-Lunartic',
        position: 'top_left',                       // Best in left or right regions
        config: { 
		distance: "miles",                      // miles or km
		useHeader: false,                       // true if you want a header
		header: "The Lunartic is in my head",   // Any text you want
		maxWidth: "300px",
		animationSpeed: 3000,                   // updated info fades in and out
        }
    },
	

## Special thanks to SpaceCowboysDude for spotting my errors, as usual.
