import Pusher from 'pusher-js';

var timeoutId: number | null = null;

function startInactivityCheck(pusher: Pusher) {
  timeoutId = window.setTimeout(function () {
    console.log('inactivity detected');
    pusher.disconnect();
    window.location.href = '/';
  }, 3 * 60 * 1000); // called after 3 minutes
}

// called by something that detects user activity
function userActivityDetected(pusher: Pusher) {
  if (timeoutId !== null) {
    window.clearTimeout(timeoutId);
  }
  startInactivityCheck(pusher);
}

export { startInactivityCheck, userActivityDetected };
