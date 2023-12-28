import { createDateTime, createTag, newTaskAction, updateDateTime, updateTagAction, updateTaskAction } from "../actions";
import { api } from '@/config.json';
import { createRequest } from "@/testUtils/createRequest";
import { mockFetchApiResponse } from "@/testUtils/mockFetchApiResponse";
import { mockRedirect } from "@/testUtils/mockRedirect";
import { DELETE, FORMS, POST, PUT } from "@/utils/constants";
import * as fetchApiData from "@/utils/fetchApiData";
import { redirect } from "react-router-dom";
import * as convertDateTimeToLocalTime from '@/utils/formatters/convertDateTimeToLocalTime'


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

    describe('#newTaskAction', () => {
        it('should create new task and redirect to that task when response returns with an _id', async () => {
            // Arrange
            const expectedUrl = `${api}task`
            const requestParams = { "method": POST };
            const mockId = 'mockId';
            const mockReturn = { _id: mockId };
            mockFetchApiResponse(fetchApiDataSpy, mockReturn)
            mockRedirect(redirect, mockReturn);

            // Act
            const actual = await newTaskAction(createRequest());

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
            const actual = await createTag(createRequest());

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody)
            expect(actual).toEqual(expected);
        });
    });

    describe('#updateTaskAction', () => {
        it('should...', async () => {
            // Arrange
            const expectedUrl = `${api}task`;
            const mockDate = 'mockingDate';
            const mockProjectId = 'mockProjectId';
            const mockDescription = 'mockDescription';
            const mockTags = 'mockTags';
            const mockId = 'mockId';
            const expectedBody = {
                body: {
                    WorkUnit: [
                        {
                            contractId: mockProjectId,
                            description: mockDescription,
                            tags: mockTags,
                            time: 0
                        }],
                    _id: mockId,
                    date: mockDate
                },
                method: PUT
            };
            const expectedTask = { _id: mockId };

            mockFetchApiResponse(fetchApiDataSpy, expectedTask)
            convertDateTimeToLocalTimeSpy.mockReturnValueOnce(mockDate);

            // Act
            const actual = await updateTaskAction(createRequest({
                formId: FORMS.updateTask,
                id: mockId,
                description: mockDescription,
                projectId: mockProjectId,
                tags: mockTags
            }));

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(actual).toEqual(expectedTask);
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
                }))

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
                }))

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
            const actual = await createDateTime(createRequest({ taskId }));

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
            const expectedTask = { time: [{ _id: 'mockId3' }, { _id: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await createDateTime(createRequest({ taskId }));

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(redirect).toHaveBeenCalledWith(`/task/${taskId}/date-time/edit/mockId2`);  // Adjust the expected URL based on your logic
            expect(actual).toEqual(expectedTask);
        });
    });

    describe('#updateDateTime', () => {
        it('should invoke fetchApiData with expected url and body. Body should have minutes passed in', async () => {
            // Arrange
            const mockTaskId = 'mockTaskId';
            const mockId = 'mockId';
            const mockDate = 'mockDate';
            const mockMinutes = 'mockMinutes';
            const expectedUrl = `${api}task/${mockTaskId}/dateTime/${mockId}`;
            const expectedBody = { "body": { "date": mockDate, id: mockId, "time": mockMinutes }, "method": "PUT" };
            mockFetchApiResponse(fetchApiDataSpy, jest.fn())

            const expectedTask = { time: [{ _id: 'mockId3' }, { _id: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await updateDateTime(createRequest({
                'id': mockId,
                'taskId': mockTaskId,
                'date': mockDate,
                'minutes': mockMinutes
            }));

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(redirect).toHaveBeenNthCalledWith(1, `/task/${mockTaskId}`)
            expect(actual).toEqual(expectedTask)
        });

        it('should invoke fetchApiData with expected url and body. Body should have minutes "00", since minutes are not set', async () => {
            // Arrange
            const mockTaskId = 'mockTaskId';
            const mockId = 'mockId';
            const mockDate = 'mockDate';
            const expectedUrl = `${api}task/${mockTaskId}/dateTime/${mockId}`;
            const expectedBody = { "body": { "date": mockDate, id: mockId, "time": '00' }, "method": "PUT" };
            mockFetchApiResponse(fetchApiDataSpy, jest.fn())

            const expectedTask = { time: [{ _id: 'mockId3' }, { _id: 'mockId4' }] };
            mockRedirect(redirect, expectedTask);

            // Act
            const actual = await updateDateTime(createRequest({
                'id': mockId,
                'taskId': mockTaskId,
                'date': mockDate
            }));

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
            expect(redirect).toHaveBeenNthCalledWith(1, `/task/${mockTaskId}`);
            expect(actual).toEqual(expectedTask);
        });
    });
});