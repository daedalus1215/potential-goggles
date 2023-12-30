import * as fetchApiData from "@/utils/fetchApiData";
import { addQuestionMarkIfRequired, fetchTask, fetchTasks, fetchTasksTitles, taskLoader } from "../loaders";
import { api } from '@/config.json';
import { LoaderFunctionArgs } from "react-router-dom";
import { mockFetchApiResponse } from "@/testUtils/mockFetchApiResponse";

describe('client/src/actionsAndLoaders/loaders.ts', () => {
    describe('loaders', () => {
        let fetchApiDataSpy: any;
        beforeEach(() => {
            fetchApiDataSpy = jest.spyOn(fetchApiData, 'default');
        });
        afterEach(() => {
            fetchApiDataSpy.mockRestore();
        });
        describe('fetchTasks', () => {
            it('should invoke fetchApiData with expected url once', async () => {
                // Arrange
                const expectedUrl = `${api}tasks`;
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTasks();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });

        describe('fetchTask', () => {
            it('should invoke fetchAPiDataSpy with expected once', async () => {
                // Arrange 
                const argument = "1";
                const expectedUrl = `${api}task/${argument}`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTask(argument);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });

        describe('fetchTasksTitles', () => {
            it('should fetch title of tasks', async () => {
                // Arrange 
                const expectedUrl = `${api}tasks-titles`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTasksTitles();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });

        describe('fetchTodaysActivities', () => {
            it('should fetch title of tasks', async () => {
                // Arrange 
                const expectedUrl = `${api}tasks-titles`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTasksTitles();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });

        describe('taskLoader', () => {
            it('should invoke fetchApiSpy with expected url and no argument, when no argument passed in', async () => {
                // Arrange
                const params = {} as LoaderFunctionArgs;
                const expectedUrl = `${api}task/`;
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await taskLoader(params);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {});
                expect(actual).toEqual(expected);
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