import FileSaver from "file-saver";

/**
 * Not exporting default, so we can spyOn
 * @param {Object} taskBundle
 */
export default function writeJsonFile(taskBundle:any) {
  // console.log(taskBundle)
  
  // window.console.log('writeable', taskBundle)
  let json = JSON.stringify(taskBundle);
  let blob = new Blob([json], { type: 'application/json' });
  let fileName = 'time-logs_' + new Date() + '.json';
  FileSaver.saveAs(blob, fileName);
}
