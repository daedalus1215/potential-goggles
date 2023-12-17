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
        it('updateDateTime', async () => {
            // Arrange
            const mockTaskId = 'mockTaskId';
            const mockId = 'mockId';
            const mockDate = 'mockDate';
            const mockMinutes = 'mockMinutes';
            const expectedUrl = `${api}/task/${mockTaskId}/dateTime/${mockId}`; 
            const expectedBody = {"body": {"date": mockDate,taskId:mockTaskId, "time": mockMinutes}, "method": "PUT"};
            // Act
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
    });
});