import { writeJsonFile } from '../writeJsonFile';
// must import the way library is being imported in function
var FileSaver = require('file-saver');

describe('src/components/TaskListView/__test__/writeJsonFile.test.js', () => {
  /**
   * 1. mock the file-saver module
   * 2. mock global.URL, b/c FileSaver.saveAs depends on it.
   * 3. FileSaver.saveAs depends on FileSaver.createObjectURL
   *    method so we mock it.
   * 4. We create spy on FileSaver.saveAs method.
   */
  function setupFileSaverMock() {
    jest.mock('file-saver');
    global.URL = { createObjectURL: jest.fn() };
    FileSaver.createObjectURL = jest.fn();
    return jest.spyOn(FileSaver, 'saveAs');
  }

  /**
   * writeJsonFile has a dependency on the global Blob and
   * we just need to be able to simulate the function
   */
  function mockBlob() {
    global.Blob = function(content, options) {
      return { content, options };
    };
  }

  describe('writeJsonFile', () => {
    const task = {
      date: '10/24/2019',
      description: 'task description becomes file name',
    };

    it('should write the task into a json file', () => {
      mockBlob();
      const spy = setupFileSaverMock();

      writeJsonFile(task);

      const stringifyJSON = JSON.stringify(task);

      expect(spy).toHaveBeenCalledWith(
        Blob([stringifyJSON], { type: 'application/json' }),
        'time-logs_' + task.date + '.json'
      );
    });
  });
});
