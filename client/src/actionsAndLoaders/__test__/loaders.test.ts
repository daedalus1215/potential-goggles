import * as fetchApiData from "@/utils/fetchApiData";
import { addQuestionMarkIfRequired, fetchTag, fetchTask, fetchTasks, fetchTasksTitles, fetchTodaysActivities, taskLoader } from "../loaders";
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
            it('should fetch title of tasks when no arguments passed in', async () => {
                // Arrange 
                const expectedUrl = `${api}activities/today`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTodaysActivities();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
            it('should fetch title of tasks when date is passed in', async () => {
                // Arrange 
                const date = '2023-12-12';
                const expectedUrl = `${api}activities/today?date=${date}`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTodaysActivities(date);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
            it('should fetch title of tasks when date and includeTags are passed in', async () => {
                // Arrange 
                const date = '2023-12-12';
                const includeTags = 'tag1'
                const expectedUrl = `${api}activities/today?date=${date}&includeTags=${includeTags}`;
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTodaysActivities(date, includeTags);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
            it('should fetch title of tasks when date, includeTags, and excludeTags are passed in', async () => {
                // Arrange 
                const date = '2023-12-12';
                const includeTags = 'tag2';
                const excludeTags = 'tag4';
                const expectedUrl = `${api}activities/today?date=${date}&includeTags=${includeTags}&excludeTags=${excludeTags}`;
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTodaysActivities(date, includeTags, excludeTags);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });
        describe('fetchTag', () => {
            it('should fetch tag with tagId', async () => {
                // Arrange 
                const expected = 'mockTagId';
                const expectedUrl = `${api}tag/${expected}`
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTag(expected);

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