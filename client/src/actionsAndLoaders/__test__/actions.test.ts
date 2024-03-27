import { createDateTime, createTag, newTaskAction, updateDateTime, updateTagAction, updateTaskAction } from "../actions";
import { api } from '@/config.json';
import { createRequest } from "@/testUtils/createRequest";
import { mockFetchApiResponse } from "@/testUtils/mockFetchApiResponse";
import { mockRedirect } from "@/testUtils/mockRedirect";
import { DELETE, FORMS, POST, PUT } from "@/utils/constants";
import * as fetchApiData from "@/utils/fetchApiData";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import * as convertDateTimeToLocalTime from '@/utils/formatters/convertDateTimeToLocalTime'
import { taskFixture } from "@/dataFixtures/taskFixtures";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),  // Use the actual module for everything else
    redirect: jest.fn(),  // Mock the 'redirect' function
}));

describe('client/src/actionsAndLoaders/__test__/actions.test.ts', () => {
    let fetchApiDataSpy: any;
    let convertDateTimeToLocalTimeSpy: any;
    beforeEach(() => {
        fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
        convertDateTimeToLocalTimeSpy = jest.spyOn(convertDateTimeToLocalTime, 'default');
    });
    afterEach(() => {
        fetchApiDataSpy.mockRestore();
        // Check if the redirect function is mocked and restore it if necessary
        if (jest.isMockFunction(redirect)) {
            redirect.mockRestore();
        }
    });
    describe('#updateTaskAction', () => {
        describe('#updateTask', () => {
            it('should update task and return the updated task response', async () => {
                // Arrange
                const { dateTimes, projectId, description, tags, taskId, title } = taskFixture();
                const expectedUrl = `${api}task`;
                const expectedBody = {
                    body: {
                        WorkUnit: [
                            {
                                contractId: projectId,
                                description: description,
                                tags: tags[0],
                                time: 0,
                                title
                            }],
                        _id: taskId,
                        date: dateTimes
                    },
                    method: PUT
                };
                const expectedTask = { taskId };

                mockFetchApiResponse(fetchApiDataSpy, expectedTask)
                convertDateTimeToLocalTimeSpy.mockReturnValueOnce(dateTimes);
                // Act
                const actual = await updateTaskAction(createRequest({
                    formId: FORMS.updateTask,
                    id: taskId,
                    description,
                    projectId: projectId,
                    tags: tags[0],
                    title: title as string
                }) as unknown as LoaderFunctionArgs);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
                expect(actual).toEqual(expectedTask);
            });
        });

        describe('#deleteTask', () => {
            it('should delete task and redirect user to home page', async () => {
                // Arrange
                const { projectId, description, tags, taskId, title } = taskFixture();
                const expectedUrl = `${api}task/${taskId}`;
                const expectedBody = {
                    method: DELETE
                };
                const expectedTask = { _id: taskId, title: title };

                mockFetchApiResponse(fetchApiDataSpy, {})
                mockRedirect(redirect, expectedTask);

                // Act
                const actual = await updateTaskAction(createRequest({
                    formId: FORMS.deleteTask,
                    id: taskId,
                    description: description,
                    projectId: projectId,
                    tags: tags[0],
                    title: title as string
                }) as unknown as LoaderFunctionArgs);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
                expect(actual).toEqual(expectedTask);
                expect(redirect).toHaveBeenNthCalledWith(1, '/')
            });
        });
    });
    describe('#newTaskAction', () => {
        it('should create new task and redirect to that task when response returns with an taskId', async () => {
            // Arrange
            const { taskId } = taskFixture();
            const expectedUrl = `${api}task`
            const requestParams = { "method": POST };
            const mockReturn = { taskId };
            mockFetchApiResponse(fetchApiDataSpy, mockReturn)
            mockRedirect(redirect, mockReturn);

            // Act
            const actual = await newTaskAction(createRequest() as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, requestParams)
            expect(actual).toEqual(mockReturn);
        });
    });

    describe('#createTag', () => {
        it('should post a new task with no description or name', async () => {
            // Arrange
            const expected = { time: [] };
            const expectedUrl = `${api}tag`
            const expectedBody = { "body": { "description": "", "name": "" }, "method": POST };
            mockFetchApiResponse(fetchApiDataSpy, expected)

            // Act
            const actual = await createTag(createRequest() as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody)
            expect(actual).toEqual(expected);
        });
    });

    describe('#updateTagAction', () => {
        describe('#updateTag', () => {
            it('should update a tag and then redirect to the tags page', async () => {
                // Arrange
                const id = 'mockId';
                const expectedBody = { "body": { "_id": id, "description": "", "name": "" }, "method": "PUT" };
                const expectedUrl = `${api}tag/${id}`;

                const expectedResponse = { tag: 'tagMockId' };
                mockFetchApiResponse(fetchApiDataSpy, { time: [] })
                mockRedirect(redirect, expectedResponse);

                // Act
                const actual = await updateTagAction(createRequest({
                    formId: FORMS.updateTag,
                    id,
                }) as unknown as LoaderFunctionArgs)

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody)
                expect(redirect).toHaveBeenNthCalledWith(1, '/tags')
                expect(actual).toEqual(expectedResponse)
            });
        });
        describe('#deleteTag', () => {
            it('should delete a tag and then redirect to the home page', async () => {
                // Arrange
                const id = 'mockId';
                const expectedBody = { "method": DELETE };
                const expectedUrl = `${api}tag/${id}`;

                const expectedResponse = { tag: 'tagMockId' };
                mockFetchApiResponse(fetchApiDataSpy, { time: [] })
                mockRedirect(redirect, expectedResponse);

                // Act
                const actual = await updateTagAction(createRequest({
                    formId: FORMS.deleteTag,
                    id,
                }) as unknown as LoaderFunctionArgs)

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody)
                expect(redirect).toHaveBeenNthCalledWith(1, '/')
                expect(actual).toEqual(expectedResponse)
            });
        });
    });

    describe('#createDateTime', () => {
        it('should not invoke redirect when task is returned with no time', async () => {
            // Arrange
            const taskId = 'mockTaskId';
            const expectedUrl = `${api}task/${taskId}/dateTime`;
            const expectedBody = { method: 'POST' };
            mockFetchApiResponse(fetchApiDataSpy, { time: [] })

            // Act
            const actual = await createDateTime(createRequest({ taskId }) as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(actual).toEqual({ time: [] });
        });
        it('should invoke redirect when task is returned with time', async () => {
            // Arrange
            const taskId = 'mockTaskId';
            const expectedUrl = `${api}task/${taskId}/dateTime`;
            const expectedBody = { method: 'POST' };
            fetchApiDataSpy.mockReturnValueOnce({ time: [{ _id: 'mockId1' }, { _id: 'mockId2' }] });
            const expectedTask = { time: [{ taskId: 'mockId3' }, { taskId: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await createDateTime(createRequest({ taskId }) as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(redirect).toHaveBeenCalledWith(`/task/${taskId}/date-time/edit/mockId2`);  // Adjust the expected URL based on your logic
            expect(actual).toEqual(expectedTask);
        });
    });

    describe('#updateDateTime', () => {
        it('should invoke fetchApiData with expected url and body. Body should have minutes passed in', async () => {
            // Arrange
            const { dateTimes,taskId } = taskFixture();
            const mockMinutes = 'mockMinutes';
            const expectedUrl = `${api}task/${taskId}/dateTime/${dateTimes[0].id}`;
            const expectedBody = { "body": { "date": dateTimes[0].date, id: dateTimes[0].id, "time": mockMinutes }, "method": "PUT" };
            mockFetchApiResponse(fetchApiDataSpy, jest.fn())

            const expectedTask = { time: [{ taskId: 'mockId3' }, { taskId: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await updateDateTime(createRequest({
                id: dateTimes[0].id,
                taskId: taskId,
                date: dateTimes[0].date,
                minutes: mockMinutes
            }) as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl,expectedBody);
            expect(redirect).toHaveBeenNthCalledWith(1, `/task/${taskId}`)
            expect(actual).toEqual(expectedTask)
        });

        it('should invoke fetchApiData with expected url and body. Body should have minutes "00", since minutes are not set', async () => {
            // Arrange
            const { dateTimes,taskId } = taskFixture();
            const {id, date} = dateTimes[0];
            const expectedUrl = `${api}task/${taskId}/dateTime/${id}`;
            const expectedBody = { "body": { date, id, "time": '00' }, "method": "PUT" };
            mockFetchApiResponse(fetchApiDataSpy, jest.fn())

            const expectedTask = { time: [{ taskId: 'mockId3' }, { taskId: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await updateDateTime(createRequest({
                id,
                taskId,
                date 
            }) as unknown as LoaderFunctionArgs);

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(redirect).toHaveBeenNthCalledWith(1, `/task/${taskId}`);
            expect(actual).toEqual(expectedTask);
        });
    });
});