/**
 * @function BufferTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 *
 * Tracks when the video player is marked as buffering and waits until the player
 * has made some progress.
 *
 * Example Usage:
 * player.on('tracking:buffered', (e, data) => console.log(data))
 *
 * Data Attributes:
 * => currentTime:    current second of video playback
 * => readyState:     video#readyState value
 * => secondsToLoad:  Total amount of time in seconds buffering took
 * => bufferCount:    Total buffer events for this source
 */

const BufferTracking = function(config) {
  const player = this;
  let scrubbing = false;
  let timer = null;
  let bufferstart = false;
  let bufferend = false;
  let bufferCount = 0;

  const reset = function() {
    if (timer) {
      clearTimeout(timer);
    }
    scrubbing = false;
    bufferstart = false;
    bufferend = false;
    bufferCount = 0;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('pause', function() {
    if (player.scrubbing()) {
      scrubbing = true;
      bufferstart = false;
      timer = setTimeout(function() {
        scrubbing = false;
      }, 200);
    }
  });

  player.on('waiting', function() {
    if ((scrubbing === false) && (player.currentTime() > 0)) {
      bufferstart = new Date();
    }
  });

  player.on('progress', function() {
    if (!bufferstart) {
      return;
    }
    bufferend = new Date();

    const curTime = +player.currentTime().toFixed(0);

    const secondsToLoad = ((bufferend - bufferstart) / 1000);

    bufferstart = false;

    if (secondsToLoad > 0) {
      bufferCount++;
      player.trigger('tracking:buffered', {
        currentTime: +curTime,
        readyState: +player.readyState(),
        secondsToLoad: +secondsToLoad,
        bufferCount: +bufferCount
      });
    }
  });
};

export default BufferTracking;
