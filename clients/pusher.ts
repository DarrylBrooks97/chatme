import Pusher from 'pusher-js';

var timeoutId: number | null = null;

const pusher = new Pusher((process.env.PUSHER_API_KEY as string) ?? '3ae509284984f174da5c', {
  cluster: (process.env.PUSHER_CLUSTER as string) ?? 'us2',
});

function startInactivityCheck() {
  timeoutId = window.setTimeout(function () {
    pusher.disconnect();
  }, 2 * 60 * 1000); // called after 5 minutes
}

// called by something that detects user activity
function userActivityDetected() {
  if (timeoutId !== null) {
    window.clearTimeout(timeoutId);
  }

  startInactivityCheck();
}

export { pusher, startInactivityCheck, userActivityDetected };
