/**
 * Track Initial Play Event
 * This event is triggered when the video has been played for the first time.
 * If you are looking to track play events, simply listen on the player for a normal
 * "play" or "playing" event.
 *
 * Example Usage:
 * player.on('tracking:firstplay', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => secondsToLoad: Total number of seconds between the player initializing
 *                   a play request and when the first frame begins.
 *
 * @function PlayTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

const PlayTracking = function(config) {
  let firstplay = false;
  let loadstart = 0;
  let loadend = 0;
  let secondsToLoad = 0;

  const reset = function() {
    firstplay = false;
    loadstart = 0;
    loadend = 0;
    secondsToLoad = 0;
  };

  const onLoadStart = function() {
    reset();
    loadstart = new Date();
  };

  const onLoadedData = function() {
    loadend = new Date();
    secondsToLoad = ((loadend - loadstart) / 1000);
  };

  const onPlaying = () => {
    if (!firstplay) {
      firstplay = true;
      this.trigger('tracking:firstplay', {
        secondsToLoad: +(secondsToLoad.toFixed(3))
      });
    }
  };

  this.on('dispose', reset);
  this.on('loadstart', onLoadStart);
  this.on('loadeddata', onLoadedData);
  this.on('playing', onPlaying);
};

export default PlayTracking;
