## 1.0.3 (2022-03-21)

- Removed eslintcache file
- Adds a PR Template file GitHub
- Changing dependency requirements for VideoJS. We I tested backwards to VideoJS 5.20.5 (release Feb 13, 2018)
- The examples file will now display the version of videojs that we're using
- Tracking the seek event using seeking
- Updates pause event to depend on the videojs seeking() and/or scrubbing() functions
- Reset the onSecondsToLoad in the Play event when the video is ended

## 1.0.2

- Adds a failsafe to percentile never firing

## 1.0.1

- [Adds an option for buffering data collection](https://github.com/spodlecki/videojs-event-tracking/pull/10)

## 1.0.0

- Releasing 1.0.0
- Testing with videojs 7
- Updating package.json with a full upgrade

## 0.0.8

- Hotfix: allowing use for videojs 5 and videojs 6

## 0.0.7

- Updating to VideoJS6

## 0.0.6

- Updating Performance Tracking to include a beforeunload event
- Update Buffer Tracking to reset when the user pauses the stream
- Update Play tracking to make sure secondsToLoad is reset to 0
