import writeJsonFile  from '../writeJsonFile';
import * as FileSaver from 'file-saver';

describe('src/components/TaskListView/__test__/writeJsonFile.test.ts', () => {
  function setupFileSaverMock() {
    jest.mock('file-saver');
  
    global.URL = {
      createObjectURL: jest.fn(),
      revokeObjectURL: jest.fn(), 
      prototype: {href: '', searchParams: {}}
    };
  
    FileSaver.createObjectURL = jest.fn();
    return jest.spyOn(FileSaver, 'saveAs');
  }
  /**
   * writeJsonFile has a dependency on the global Blob and
   * we just need to be able to simulate the function
   */
  function mockBlob() {
    global.Blob = function(content:any, options:any) {
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
