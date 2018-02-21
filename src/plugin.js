import videojs from 'video.js';
import {version as VERSION} from '../package.json';

import BufferTracking from './tracking/buffering';
import PauseTracking from './tracking/pause';
import PositionTracking from './tracking/percentile';
import PerformanceTracking from './tracking/performance';
import PlayTracking from './tracking/play';
import SeekTracking from './tracking/seek';

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
const getPlugin = videojs.getPlugin || videojs.plugin;

/**
 * Event Tracking for VideoJS
 *
 * @function eventTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const eventTracking = function(options) {
  PauseTracking.apply(this, arguments);
  BufferTracking.apply(this, arguments);
  PositionTracking.apply(this, arguments);
  PlayTracking.apply(this, arguments);
  SeekTracking.apply(this, arguments);
  PerformanceTracking.apply(this, arguments);
};

// Register the plugin with video.js, avoid double registration
if (typeof getPlugin('eventTracking') === 'undefined') {
  registerPlugin('eventTracking', eventTracking);
}

// Include the version number.
eventTracking.VERSION = VERSION;

export default eventTracking;
