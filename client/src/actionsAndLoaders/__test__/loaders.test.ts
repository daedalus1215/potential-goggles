import * as fetchApiData from "@/utils/fetchApiData";
import { addQuestionMarkIfRequired, createQueryParams, dateTimeLoader, fetchAllMonthTasks, fetchTag, fetchTags, fetchTask, fetchTasks, fetchTasksTitles, fetchTodaysActivities, taskLoader, tasksLoader } from "../loaders";
import { api } from '@/config.json';
import { LoaderFunctionArgs } from "react-router-dom";
import { mockFetchApiResponse } from "@/testUtils/mockFetchApiResponse";
import { taskFixture } from "@/dataFixtures/taskFixtures";
import { createRequest } from "@/testUtils/createRequest";

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
                const expected = { taskId: 'mockTaskId' };
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
                const expected = { taskId: 'mockTaskId' };
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
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTasksTitles();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });
        describe('createQueryParams', () => {
            it('should return empty string if empty string is passed in', async () => {
                // Arrange     
                const expected = '';

                // Act
                const actual = await createQueryParams();

                // Assert
                expect(actual).toEqual(expected);
            });
            it('should return date query param when date is passed in', async () => {
                // Arrange 
                const date = '2023-12-12';
                const expected = `?date=${date}`;

                // Act
                const actual = await createQueryParams(date);

                // Assert
                expect(actual).toEqual(expected);
            });
            it('should return date and includeTags query params when date and includeTags passed in', async () => {
                // Arrange 
                const includeTags = 'tag1'
                const date = '2023-12-12';
                const expected = `?date=${date}&includeTags=${includeTags}`;

                // Act
                const actual = await createQueryParams(date, includeTags);

                // Assert
                expect(actual).toEqual(expected);
            });
            it('should return date, includeTags, and exclude tags in query params when all three are passed in', async () => {
                // Arrange 
                const date = '2023-12-12';
                const includeTags = 'tag2';
                const excludeTags = 'tag4';
                const expected = `?date=${date}&includeTags=${includeTags}&excludeTags=${excludeTags}`;

                // Act
                const actual = await createQueryParams(date, includeTags, excludeTags);

                // Assert
                expect(actual).toEqual(expected);
            });
        });
        describe('fetchTodaysActivities', () => {
            it('should fetch title of tasks when no arguments passed in', async () => {
                // Arrange 
                const expectedUrl = `${api}activities/today`
                const expected = { taskId: 'mockTaskId' };
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
                const expected = { taskId: 'mockTaskId' };
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
                const expected = { taskId: 'mockTaskId' };
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
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTodaysActivities(date, includeTags, excludeTags);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });
        describe('fetchAllMonthTasks', () => {
            it('should fetch months when includeTags and excludeTags not passed in', async () => {
                // Arrange 
                const expectedUrl = `${api}activities/months?includeTags=undefined&excludeTags=undefined`
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchAllMonthTasks();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
            it('should fetch months when includeTags are, but exclude tags are not, passed in', async () => {
                // Arrange 
                const includeTags = 'tag1'
                const expectedUrl = `${api}activities/months?includeTags=${includeTags}&excludeTags=undefined`;
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchAllMonthTasks(includeTags);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
            it('should fetch months when includeTags are, but exclude tags are not, passed in', async () => {
                // Arrange 
                const includeTags = 'tag1'
                const excludeTags = 'tag2'
                const expectedUrl = `${api}activities/months?includeTags=${includeTags}&excludeTags=${excludeTags}`;
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchAllMonthTasks(includeTags, excludeTags);

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
        describe('fetchTags', () => {
            it('should fetch all tags', async () => {
                // Arrange 
                const expectedUrl = `${api}tags`
                const expected = [{ taskId: 'mockTagId' }];
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await fetchTags();

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
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await taskLoader(params);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {});
                expect(actual).toEqual(expected);
            });
        });
        describe('tasksLoader', () => {
            it('should invoke fetchApiSpy with expected url and no argument, when no argument passed in', async () => {
                // Arrange
                const expectedUrl = `${api}tasks`;
                const expected = { taskId: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await tasksLoader();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });
        describe('dateTimeLoader', () => {
            describe('with a taskId', () => {
                it('should fetch and return dateTime with an id equal to the taskId  ', async () => {
                    // Arrange 
                    const task = taskFixture();
                    const taskId = task.taskId;
                    const expectedUrl = `${api}task/${taskId}`
                    const expected = { taskId, dateTime: task.dateTimes[0] }
                    mockFetchApiResponse(fetchApiDataSpy, task);

                    // Act
                    const actual = await dateTimeLoader(createRequest(undefined, undefined, { taskId, dateTimeId: task.dateTimes[0].id }));

                    // Assert
                    expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                    expect(actual).toEqual(expected);
                });
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