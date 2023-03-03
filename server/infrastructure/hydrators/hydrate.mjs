import logger from "../logger.mjs";


export default function hydrate(err, docs) {
  if (err) {
    logger.error(`Error hydrating: ${err}`);
    return { 'error': err };
  }

  return docs;
};
