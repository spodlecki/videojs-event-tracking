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
  let timer = null;
  let scrubbing = false;
  let bufferPosition = false;
  let bufferStart = false;
  let bufferEnd = false;
  let bufferCount = 0;
  let readyState = false;

  const reset = function() {
    if (timer) {
      clearTimeout(timer);
    }
    scrubbing = false;
    bufferPosition = false;
    bufferStart = false;
    bufferEnd = false;
    bufferCount = 0;
    readyState = false;
  };

  player.on('dispose', reset);
  player.on('loadstart', reset);
  player.on('ended', reset);
  player.on('pause', function() {
    if (player.scrubbing()) {
      scrubbing = true;
      bufferStart = false;
      timer = setTimeout(function() {
        scrubbing = false;
      }, 200);
    }
  });

  player.on('waiting', function() {
    if ((scrubbing === false) && (player.currentTime() > 0)) {
      bufferStart = new Date();
      bufferPosition = +player.currentTime().toFixed(0);
      readyState = +player.readyState()
    }
  });

  player.on('timeupdate', function() {
    const curTime = +player.currentTime().toFixed(0);

    if (bufferStart && curTime != bufferPosition) {
      bufferEnd = new Date();

      const secondsToLoad = ((bufferEnd - bufferStart) / 1000);

      bufferStart     = false;
      bufferPosition  = false;
      bufferCount++;

      player.trigger('tracking:buffered', {
        currentTime: +curTime,
        readyState: +readyState,
        secondsToLoad: +secondsToLoad.toFixed(3),
        bufferCount: +bufferCount
      });
    }
  });
};

export default BufferTracking;
