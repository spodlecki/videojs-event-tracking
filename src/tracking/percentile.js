/**
 * Track Overall Percentile (1st, 2nd, 3rd, and 4th) of Completion
 * This event triggers each quarter of a video.
 *
 * Example Usage:
 * player.on('tracking:first-quarter', (e, data) => console.log(data))
 * player.on('tracking:second-quarter', (e, data) => console.log(data))
 * player.on('tracking:third-quarter', (e, data) => console.log(data))
 * player.on('tracking:fourth-quarter', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => pauseCount:       Total number of Pause events triggered
 * => seekCount:        Total number of Seek events triggered
 * => currentTime:      Current second video is on
 * => duration:         Total duration of video
 *
 * @function PercentileTracking
 * @param    {Object} [config={}]
 *           An object of config left to the plugin author to define.
 */

const PercentileTracking = function(config) {
  const player = this;
  let first = false;
  let second = false;
  let third = false;
  let duration = null;
  let pauseCount = 0;
  let seekCount = 0;

  const reset = function(e) {
    first = false;
    second = false;
    third = false;
    duration = null;
    pauseCount = 0;
    seekCount = 0;
  };

  const incPause = () => pauseCount++;
  const incSeek = () => seekCount++;

  const getDuration = function() {
    duration = +player.duration().toFixed(0);
    if (duration > 0) {
      const quarter = (duration / 4).toFixed(0);

      first = +quarter;
      second = +quarter * 2;
      third = +quarter * 3;
    }
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('tracking:pause', incPause);
  player.on('tracking:seek', incSeek);
  player.on('timeupdate', function() {
    if (duration === null) {
      getDuration();
    }

    const curTime = +player.currentTime().toFixed(0);
    const data = {
      seekCount,
      pauseCount,
      currentTime: curTime,
      duration
    };

    switch (curTime) {
    case first:
      first = false;
      player.trigger('tracking:first-quarter', data);
      break;
    case second:
      second = false;
      player.trigger('tracking:second-quarter', data);
      break;
    case third:
      third = false;
      player.trigger('tracking:third-quarter', data);
      break;
    }

  });
  player.on('ended', function() {
    const data = {
      seekCount,
      pauseCount,
      currentTime: duration,
      duration
    };

    player.trigger('tracking:fourth-quarter', data);
  });

  player.on('durationchange', getDuration);
};

export default PercentileTracking;
