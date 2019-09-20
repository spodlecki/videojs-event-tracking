# videojs-event-tracking

Track events with VideoJS and keep an eye on performance metrics. This has been tested with VideoJS 5 through 7, if you want to see if it works nicely with your version simply clone the repo and update package.json. Open `index.html` and press play -- watch the events stream through.

## Installation

```sh
npm install --save videojs-event-tracking
```

```sh
yarn add videojs-event-tracking
```

## Usage

To include videojs-event-tracking on your website or web application, use any of the following methods.

Initializing just like a normal videojs plugin does.

```javascript
videojs('videodomid', {..., plugins: { eventTracking: true } });
// or
videoInstance.eventTracking({... config ...});
```

## Current Events


### Play

This event is triggered when the video has been played for the first time. If you are looking to track play events, simply listen on the player for a normal "play" or "playing" event.

```javascript
player.on('tracking:firstplay', (e, data) => console.log(data))
```

Data Attributes:

* secondsToLoad: Total number of seconds between the player initializing a play request and when the first frame begins.

### Pausing

Tracks when users pause the video.

```javascript
player.on('tracking:pause', (e, data) => console.log(data))
```

Data Attributes:

* pauseCount:       Total number of Pause events triggered

### Seeking

During playback, we are tracking how many times a person seeks, and the position a user has seeked to.

```javascript
player.on('tracking:seek', (e, data) => console.log(data))
```

Data Attributes:

* seekCount: total number of seeks that has occuring during this file
* seekTo: Position, in seconds, that has been seeked to.

### Buffering

Tracks when the video player is marked as buffering and waits until the player has made some progress.

```javascript
player.on('tracking:buffered', (e, data) => console.log(data))
```

Data Attributes:

* currentTime:    current second of video playback
* readyState:     video#readyState value
* secondsToLoad:  Total amount of time in seconds buffering took
* bufferCount:    Total buffer events for this source

### Positioning

Track Overall Percentile (1st, 2nd, 3rd, and 4th) of Completion. This event triggers each quarter of a video.

```javascript
player.on('tracking:first-quarter', (e, data) => console.log(data))
player.on('tracking:second-quarter', (e, data) => console.log(data))
player.on('tracking:third-quarter', (e, data) => console.log(data))
player.on('tracking:fourth-quarter', (e, data) => console.log(data))
```

Data Attributes:

* pauseCount:       Total number of Pause events triggered
* seekCount:        Total number of Seek events triggered
* currentTime:      Current second video is on
* duration:         Total duration of video

### Performance

_*note* a little experimental_

This event triggers when the player has changed sources, has ended, or has been destroyed.

```javascript
player.on('tracking:performance', (e, data) => console.log(data))
```

Data Attributes:

* pauseCount:       Total number of Pause events triggered
* seekCount:        Total number of Seek events triggered
* bufferCount:      Total number of Buffer events triggered
* totalDuration:    Total duration provided by the file
* watchedDuration:  Total number of seconds watched, this excluses seconds a user has seeked past.
* bufferDuration:   Total seconds that buffering has occured
* initialLoadTime:  Seconds it took for the initial frame to appear

*Special Requirement*
When initializing, you'll need to pass a function to the configuration for this plugin.

```javascript
pluginConfig = {
  performance: function(data) {
    /** Use your preferred event tracking platform.
     *  Google Analytics? Amplitude? Piwik? Mixpanel?
     */
  }
}
```
