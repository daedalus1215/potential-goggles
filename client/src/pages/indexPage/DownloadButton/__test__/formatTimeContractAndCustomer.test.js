import formatTimeContractAndCustomer from '../formatTimeContractAndCustomer';
import { displayMsInFractionalHourFormat } from 'utils';

describe('src/components/TaskListView/__test__/formatTimeContractAndCustomer.test.js', () => {
  describe('formatTimeContractAndCustomer', () => {
    const projects = [
      {
        key: 'project Id',
        contract: 'contract for the project',
        customer: 'customer for the contract'
      },
      {
        key: 'project Id2',
        contract: 'contract for the project2',
        customer: 'customer for the contract2'
      },
      {
        key: 'project Id3',
        contract: 'contract for the project3',
        customer: 'customer for the contract3'
      }
    ];
    const task = {
      time: 10000,
      contractId: 'project Id3',
      description: 'task description becomes file name'
    };

    it('should return a formatted task in preperation of saving into the json file', () => {
      const expectedTaskWithProject = {
        ...task,
        time: displayMsInFractionalHourFormat(task.time),
        contract: projects[2].contract,
        customer: projects[2].customer
      };

      const actualTaskWithProject = formatTimeContractAndCustomer(
        task,
        projects
      );
      expect(actualTaskWithProject).toEqual(expectedTaskWithProject);
    });
  });
});
