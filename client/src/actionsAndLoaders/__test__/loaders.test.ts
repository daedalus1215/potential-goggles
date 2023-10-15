import * as fetchApiData from "@/utils/fetchApiData";
import { addQuestionMarkIfRequired, fetchTask, fetchTasks, taskLoader } from "../loaders";
import { api } from '@/config.json';
import { LoaderFunctionArgs } from "react-router-dom";

describe('client/src/actionsAndLoaders/loaders.ts', () => {
    describe('loaders', () => {
        let fetchApiDataSpy: any;
        beforeEach(() => {
            fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
            fetchApiDataSpy.mockReturnValueOnce(false, jest.fn());
        });
        afterEach(() => {
            fetchApiDataSpy.mockRestore();
        });
        describe('fetchTasks', () => {
            it('should invoke fetchApiData with expected url once', async () => {
                // Arrange
                const expected = `${api}tasks`;

                // Act
                await fetchTasks();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expected, {})
            });
        });

        describe('fetchTask', () => {
            it('should invoke fetchAPiDataSpy with expected once', async () => {
                // Arrange 
                const argument = "1";
                const expected = `${api}task/${argument}`

                // Act
                await fetchTask(argument);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expected, {})
            });
        });

        describe('taskLoader', () => {
            it('should invoke fetchApiSpy with expected url and no argument, when no argument passed in', () => {
                // Arrange
                const params = {} as LoaderFunctionArgs;
                const expected = `${api}task/`;

                // Act
                taskLoader(params);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expected, {});
            })
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