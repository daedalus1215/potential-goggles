import logger from "../logger.mjs";
import hydrate from "./hydrate.mjs";

const hydrateAndResponse = responder => (err, docs) => {
  const item = hydrate(err, docs);
  err && logger.error(err);
  docs && logger.debug(`hydrated: ${docs}`);
  !item && responder({ error: err, items: [] });
  item && responder(item);
};

export default hydrateAndResponse;
