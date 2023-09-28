import * as FileSaver from "file-saver";

/**
 * Not exporting default, so we can spyOn
 * @param {Object} taskBundle
 */
export default function writeJsonFile(taskBundle:any) {  
  let json = JSON.stringify(taskBundle);
  let blob = new Blob([json], { type: 'application/json' });
  let fileName = 'time-logs_' + new Date() + '.json';
  FileSaver.saveAs(blob, fileName);
}
