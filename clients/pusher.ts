import Pusher from "pusher-js";

const pusher = new Pusher(
  (process.env.PUSHER_API_KEY as string) ?? "3ae509284984f174da5c",
  {
    cluster: (process.env.PUSHER_CLUSTER as string) ?? "us2",
  }
);

export { pusher };
