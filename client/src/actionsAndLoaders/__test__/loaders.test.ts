import * as fetchApiData from "../../utils/fetchApiData";
import { addQuestionMarkIfRequired, fetchTasks } from "../loaders";
import { api } from '@/config.json';

describe('client/src/actionsAndLoaders/loaders.ts', () => {
    describe('loaders', () => {
        describe('fetchTasks', () => {
            let fetchApiDataSpy: any;
            beforeEach(() => {
                fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
                fetchApiDataSpy.mockReturnValueOnce(false, jest.fn());
            });

            it('should...', () => {
                // Arrange & Act
                fetchTasks();
                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, `${api}tasks`, {})
            });
        });
        describe('addQuestionMarkIfRequired', () => {
            it('should return with a "?" if none given', () => {
                // Arrange
                const url = `${api}stats`;
                const expected = { url: url + '?' };

                // Act
                const actual = addQuestionMarkIfRequired({ url } as Request);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return with a "&" if "?" given', () => {
                // Arrange
                const url = `${api}stats?`;
                const expected = { url: url + '&' };

                // Act
                const actual = addQuestionMarkIfRequired({ url } as Request);

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
})