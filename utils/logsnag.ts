import { LogSnag } from "logsnag";

const { LOGSNAG_SECRET } = process.env;

export const logsnag = new LogSnag({
  token: LOGSNAG_SECRET!,
  project: "live-bpmn",
});
