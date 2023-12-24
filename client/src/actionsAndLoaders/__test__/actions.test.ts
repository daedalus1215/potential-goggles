import { createDateTime, updateDateTime, updateTagAction } from "../actions";
import { api } from '@/config.json';
import { createRequest } from "@/testUtils/createRequest";
import { mockRedirect } from "@/testUtils/mockRedirect";
import { DELETE, FORMS } from "@/utils/constants";
import * as fetchApiData from "@/utils/fetchApiData";
import { redirect } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),  // Use the actual module for everything else
    redirect: jest.fn(),  // Mock the 'redirect' function
}));

describe('client/src/actionsAndLoaders/__test__/actions.test.ts', () => {
    let fetchApiDataSpy: any;
    beforeEach(() => {
        fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
    });
    afterEach(() => {
        fetchApiDataSpy.mockRestore();
        jest.clearAllMocks();  // Clear all mock calls between tests
    });

    describe('#updateTagAction', () => {
        describe('#updateTag', () => {
            it('should update a tag and then redirect to the tags page', async () => {
                // Arrange
                const id = 'mockId';
                const expectedBody = {"body": {"_id": id, "description": "", "name": ""}, "method": "PUT"};
                const expectedUrl = `${api}tag/${id}`;
                
                const expectedResponse = {tag: 'tagMockId'};
                fetchApiDataSpy.mockReturnValueOnce({ time: [] });
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
                const expectedBody =  {"method": DELETE};
                const expectedUrl = `${api}tag/${id}`;
                
                const expectedResponse = {tag: 'tagMockId'};
                fetchApiDataSpy.mockReturnValueOnce({ time: [] });
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
            fetchApiDataSpy.mockReturnValueOnce({ time: [] });

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
            // expect(actual).toEqual(expectedTask);
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
            fetchApiDataSpy.mockReturnValueOnce(false, jest.fn());

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
            // expect(actual).toEqual(expectedTask)
        });

        it('should invoke fetchApiData with expected url and body. Body should have minutes "00", since minutes are not set', async () => {
            // Arrange
            const mockTaskId = 'mockTaskId';
            const mockId = 'mockId';
            const mockDate = 'mockDate';
            const expectedUrl = `${api}task/${mockTaskId}/dateTime/${mockId}`;
            const expectedBody = { "body": { "date": mockDate, id: mockId, "time": '00' }, "method": "PUT" };
            fetchApiDataSpy.mockReturnValueOnce(false, jest.fn());

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
            // expect(actual).toEqual(expectedTask);
        });
    });
});