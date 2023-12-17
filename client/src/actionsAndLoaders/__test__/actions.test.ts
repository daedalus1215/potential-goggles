import { updateDateTime } from "../actions";

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

            // Act
            await updateDateTime({
                params: {},
                request: {
                    formData: () => ({
                        get: (key: string): any => {
                            const hashing: { [key: string]: string } = {
                                'id': 'mockId',
                                'taskId': 'mockTaskId'
                            };
                            return hashing[key];
                        }
                    })
                }
            });

            // Assert
            expect(fetchApiDataSpy).toHaveBeenCalledTimes(1);
        });
    });
});