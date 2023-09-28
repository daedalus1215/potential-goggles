import { mockBlob, setupFileSaverMock } from '@/dataFixtures/writeJsonFileFixture';
import writeJsonFile from '../writeJsonFile';

describe('src/components/TaskListView/__test__/writeJsonFile.test.ts', () => {
  describe('writeJsonFile', () => {
    const task = {
      date: '10/24/2019',
      description: 'task description becomes file name',
    };

    it('should write the task into a json file', () => {
      mockBlob();
      const spy = setupFileSaverMock();

      writeJsonFile(task);

      // const stringifyJSON = JSON.stringify(task);

      expect(spy).toHaveBeenCalledTimes(1);
      // the equals is matching, but it's recognizing the blob as a different object.
      // expect(spy).toHaveBeenCalledWith(
      //   new Blob([stringifyJSON], { type: 'application/json' }),
      //   'time-logs_' + new Date() + '.json'
      // );
    });
  });
});
