import { updateDateTime } from "../actions";
import { api } from '@/config.json';
import * as fetchApiData from "@/utils/fetchApiData";
import { redirect } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
    'redirect': jest.fn()
}));

describe('client/src/actionsAndLoaders/__test__/actions.test.ts', () => {
    let fetchApiDataSpy: any;
    beforeEach(() => {
        fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
        fetchApiDataSpy.mockReturnValueOnce(false, jest.fn());
    });
    afterEach(() => {
        fetchApiDataSpy.mockRestore();
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

            // Act
            //@TODO: This needs to be abstracted
            await updateDateTime({
                params: {},
                request: {
                    formData: () => ({
                        get: (key: string): any => {
                            const hashing: { [key: string]: string } = {
                                'id': mockId,
                                'taskId': mockTaskId,
                                'date': mockDate,
                                'minutes': mockMinutes
                            };
                            return hashing[key];
                        }
                    })
                }
            });

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
        });

        it('should invoke fetchApiData with expected url and body. Body should have minutes "00", since minutes are not set', async () => {
            // Arrange
            const mockTaskId = 'mockTaskId';
            const mockId = 'mockId';
            const mockDate = 'mockDate';
            const expectedUrl = `${api}task/${mockTaskId}/dateTime/${mockId}`;
            const expectedBody = { "body": { "date": mockDate, id: mockId, "time": '00' }, "method": "PUT" };

            // Act
            //@TODO: This needs to be abstracted
            await updateDateTime({
                params: {},
                request: {
                    formData: () => ({
                        get: (key: string): any => {
                            const hashing: { [key: string]: string } = {
                                'id': mockId,
                                'taskId': mockTaskId,
                                'date': mockDate
                            };
                            return hashing[key];
                        }
                    })
                }
            });

            // Assert
            expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, expectedBody);
        });
    });
});