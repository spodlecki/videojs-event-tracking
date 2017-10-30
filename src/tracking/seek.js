/**
 * Track Seeking Events
 * During playback, we are tracking how many times a person seeks, and
 * the position a user has seeked to.
 *
 * Example Usage:
 * player.on('tracking:seek', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => seekCount: total number of seeks that has occuring during this file
 * => seekTo: Position, in seconds, that has been seeked to.
 *
 * @function SeekTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */
const SeekTracking = function(config) {
  const player = this;
  let seekCount = 0;
  let locked = true;
  const reset = function() {
    seekCount = 0;
    locked = true;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('play', () => {
    locked = false;
  });
  player.on('pause', function() {
    if (locked || !player.scrubbing()) {
      return;
    }

    const curTime = +player.currentTime().toFixed(0);

    seekCount++;
    player.trigger('tracking:seek', {
      seekCount: +seekCount,
      seekTo: curTime
    });
  });
};

export default SeekTracking;
