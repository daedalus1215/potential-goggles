import { Task } from '@/interfaces';
import formatTimeContractAndCustomer from '../formatTimeContractAndCustomer';
import { displayMsInFractionalHourFormat } from '@/utils';
import { TaskFixture } from '@/dataFixtures/TaskFixture';
import { ProjectFixture } from '@/dataFixtures/ProjectFixture';

describe('src/components/TaskListView/__test__/formatTimeContractAndCustomer.test.js', () => {
  describe('formatTimeContractAndCustomer', () => {
    it('should return a formatted task in preperation of saving into the json file', () => {
      // Arrange
      const expectedTaskWithProject = {
        ...TaskFixture,
        time: displayMsInFractionalHourFormat(TaskFixture.time),
        // contract: ProjectFixture[2].contract,
        // customer: ProjectFixture[2].customer
      };

      // Act
      const actualTaskWithProject = formatTimeContractAndCustomer(
        TaskFixture,
        ProjectFixture
      );

      // Assert
      expect(actualTaskWithProject).toEqual(expectedTaskWithProject);
    });
  });
});
