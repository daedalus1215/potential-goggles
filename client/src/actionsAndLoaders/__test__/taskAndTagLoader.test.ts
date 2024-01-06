import { LoaderFunctionArgsStub } from "@/dataFixtures/LoaderFunctionArgsStub";
import { taskAndTagLoader } from "../taskAndTagLoader";
import { fetchTask, fetchTags } from "../loaders";

jest.mock('../loaders', () => ({
    fetchTask: jest.fn(),
    fetchTags: jest.fn(),
}));

describe('taskAndTagLoader', () => {
    it('should fetch task and all tags, when given task id in request. Expect task and set of options. The Options should be all false, except the tags in the task.', async () => {
        // Arrange 
        const params = {
            ...LoaderFunctionArgsStub,
            params: { taskId: 'mockTaskId' }
        }
        const task = {
            tags: [
                'name2',
                'name3',
                'name4'
            ]
        };

        const tags = [
            {
                name: 'name1'
            },
            {
                name: 'name2'
            },
            {
                name: 'name3'
            },
            {
                name: 'name4'
            }
        ];

        const expectedTags = [
            {
                name: 'name1',
                selected: false,
            },
            {
                name: 'name2',
                selected: true
            },
            {
                name: 'name3',
                selected: true,
            },
            {
                name: 'name4',
                selected: true,
            }
        ];

        // Mock the fetchTask and fetchTags functions
        (fetchTask as jest.Mock).mockResolvedValueOnce(task);
        (fetchTags as jest.Mock).mockResolvedValueOnce(tags);

        // Act
        const actual = await taskAndTagLoader(params);

        // Assert
        expect(actual).toEqual({ task, options: expectedTags });
    });
});
