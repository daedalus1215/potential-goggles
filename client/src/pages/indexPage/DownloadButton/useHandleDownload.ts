import writeJsonFile from './writeJsonFile';
import { Task } from '../../../interfaces';
import { displayMsInFractionalHourFormat } from '../../../utils';
import { fetchTasks } from '../../../actionsAndLoaders/actions';

const useHandleDownload = async () => {
    const tasks = await fetchTasks();

    const assembleTask = tasks?.map(task =>
        ({ ...task, time: displayMsInFractionalHourFormat(task.time) })
    );
    // console.log('assembledTasked', assembleTask)
    return (e?:any) => {
        writeJsonFile(assembleTask);
    };
};

export default useHandleDownload;