import { Task } from '@/interfaces';
import formatTimeContractAndCustomer from '../formatTimeContractAndCustomer';
import { displayMsInFractionalHourFormat } from '@/utils';
import { taskFixture } from '@/dataFixtures/taskFixtures';
import { ProjectFixture } from '@/dataFixtures/ProjectFixture';

describe('src/components/TaskListView/__test__/formatTimeContractAndCustomer.test.js', () => {
  describe('formatTimeContractAndCustomer', () => {
    it('should return a formatted task in preperation of saving into the json file', () => {
      // Arrange
      const task = taskFixture();
      const expectedTaskWithProject = {
        ...task,
        time: displayMsInFractionalHourFormat(task.time),
        // contract: ProjectFixture[2].contract,
        // customer: ProjectFixture[2].customer
      };

      // Act
      const actualTaskWithProject = formatTimeContractAndCustomer(
        task,
        ProjectFixture
      );

      // Assert
      expect(actualTaskWithProject).toEqual(expectedTaskWithProject);
    });
  });
});
