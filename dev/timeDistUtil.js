const MSECS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

export function formatTimeText(elapsedMsecs) {
    var seconds,
        hours,
        minutes,
        showingHours,
        ret = "";

    if (isNaN(elapsedMsecs)) {
      return "-";
    }

    seconds = Math.floor(elapsedMsecs / MSECS_IN_SECOND),
    hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds -= (hours * SECONDS_IN_HOUR);
    minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    seconds -= (minutes * SECONDS_IN_MINUTE);

    showingHours = (hours > 0);
    if (showingHours) {
        ret += hours + ":";
    }

    if (!showingHours) {
      ret += minutes + ":";
    } else {
        if (minutes == 0) {
            ret += "00:";
        } else if (minutes < 10) {
            ret += "0" + minutes + ":";
        } else {
            ret += minutes + ":";
        }
    }

    if (seconds == 0) {
        ret += "00";
    } else if (seconds < 10) {
        ret += "0" + seconds;
    } else {
        ret += seconds;
    }

    return ret;
}

export function formatDistanceText(miles) {
    return miles.toFixed(1) + " mi";
}

export function calcMilePace(miles, elapsedMsecs) {
    if (miles === 0) {
      return NaN;
    } else {
      return elapsedMsecs / miles;
    }
}
