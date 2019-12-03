/**
 * @function BufferTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 *
 *           Can contain the following optional configuration, passed during plugin initialization:
 *           bufferingConfig.includeScrub => Boolean indicating whether buffering metrics
 *           should be considered for computation while user is scrubbing on the video player.
 *
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

  const onPause = () => {
    bufferStart = false;

    if (this.scrubbing() && !(config.bufferingConfig && config.bufferingConfig.includeScrub)) {
      scrubbing = true;
      timer = setTimeout(function() {
        scrubbing = false;
      }, 200);
    }
  };

  const onPlayerWaiting = () => {
    if (bufferStart === false && scrubbing === false && this.currentTime() > 0) {
      bufferStart = new Date();
      bufferPosition = +this.currentTime().toFixed(0);
      readyState = +this.readyState();
    }
  };

  const onTimeupdate = () => {
    const curTime = +this.currentTime().toFixed(0);

    if (bufferStart && curTime !== bufferPosition) {
      bufferEnd = new Date();

      const secondsToLoad = ((bufferEnd - bufferStart) / 1000);

      bufferStart = false;
      bufferPosition = false;
      bufferCount++;

      this.trigger('tracking:buffered', {
        currentTime: +curTime,
        readyState: +readyState,
        secondsToLoad: +secondsToLoad.toFixed(3),
        bufferCount: +bufferCount
      });
    }
  };

  this.on('dispose', reset);
  this.on('loadstart', reset);
  this.on('ended', reset);
  this.on('pause', onPause);
  this.on('waiting', onPlayerWaiting);
  this.on('timeupdate', onTimeupdate);
};

export default BufferTracking;
