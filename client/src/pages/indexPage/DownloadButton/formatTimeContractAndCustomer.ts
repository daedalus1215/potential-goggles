import { Task } from '../../../interfaces';
import { displayMsInFractionalHourFormat } from '../../../utils';

/**
 * Take a task object and an array of projects and reformat the
 * task object something that can be aggregated and written into
 * a json file.
 *
 * @param {Object} task: a Task object
 * @param {Array} projects: array of projects.
 * @returns {Object} a task that has a format for a json file.
 */
export default function formatTimeContractAndCustomer(task: Task, projects: any) {
  const taskWithProject = { ...task };

  taskWithProject.time = displayMsInFractionalHourFormat(task.time) as any;

  projects.forEach((project: any) => {
    if (taskWithProject.projectId === project.key) {
      taskWithProject.projectId = project.contract;
      taskWithProject.projectId = project.customer;
    }
  });

  return taskWithProject;
}
