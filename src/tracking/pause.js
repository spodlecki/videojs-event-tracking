/**
 * Tracks when users pause the video.
 *
 * Example Usage:
 * player.on('tracking:pause', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => pauseCount:       Total number of Pause events triggered
 *
 * @function PauseTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

const PauseTracking = function(config) {
  const player = this;
  let pauseCount = 0;
  let timer = null;
  let locked = false;
  const reset = function(e) {
    if (timer) {
      clearTimeout(timer);
    }
    pauseCount = 0;
    locked = false;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('pause', function() {
    if (player.scrubbing() || locked) {
      return;
    }

    timer = setTimeout(function() {
      pauseCount++;
      player.trigger('tracking:pause', {pauseCount});
    }, 300);
  });
};

export default PauseTracking;
