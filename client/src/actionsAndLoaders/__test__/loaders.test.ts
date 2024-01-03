import * as fetchApiData from "@/utils/fetchApiData";
import { addQuestionMarkIfRequired, fetchTag, fetchTags, fetchTask, fetchTasks, fetchTasksTitles, fetchTodaysActivities, taskAndTagLoader, taskLoader, tasksLoader } from "../loaders";
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
        describe('fetchTags', () => {
            it('should fetch all tags', async () => {
                // Arrange 
                const expectedUrl = `${api}tags`
                const expected = [{ _id: 'mockTagId' }];
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
                const expected = { _id: 'mockTaskId' };
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
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await tasksLoader();

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
                expect(actual).toEqual(expected);
            });
        });
        describe('taskAndTagLoader', () => {
            it('asdasd', async () => {
                // Arrange 
                const params: LoaderFunctionArgs = {
                    params: { taskId: 'taskId' },
                    request: {
                        cache: "default",
                        credentials: "include",
                        destination: "",
                        headers: {
                            append: function (name: string, value: string): void {
                                throw new Error("Function not implemented.");
                            },
                            delete: function (name: string): void {
                                throw new Error("Function not implemented.");
                            },
                            get: function (name: string): string | null {
                                throw new Error("Function not implemented.");
                            },
                            has: function (name: string): boolean {
                                throw new Error("Function not implemented.");
                            },
                            set: function (name: string, value: string): void {
                                throw new Error("Function not implemented.");
                            },
                            forEach: function (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
                                throw new Error("Function not implemented.");
                            },
                            entries: function (): IterableIterator<[string, string]> {
                                throw new Error("Function not implemented.");
                            },
                            keys: function (): IterableIterator<string> {
                                throw new Error("Function not implemented.");
                            },
                            values: function (): IterableIterator<string> {
                                throw new Error("Function not implemented.");
                            },
                            [Symbol.iterator]: function (): IterableIterator<[string, string]> {
                                throw new Error("Function not implemented.");
                            }
                        },
                        integrity: "",
                        keepalive: false,
                        method: "",
                        mode: "cors",
                        redirect: "error",
                        referrer: "",
                        referrerPolicy: "",
                        signal: {
                            aborted: false,
                            onabort: null,
                            reason: undefined,
                            throwIfAborted: function (): void {
                                throw new Error("Function not implemented.");
                            },
                            addEventListener: function <K extends "abort">(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void {
                                throw new Error("Function not implemented.");
                            },
                            removeEventListener: function <K extends "abort">(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void {
                                throw new Error("Function not implemented.");
                            },
                            dispatchEvent: function (event: Event): boolean {
                                throw new Error("Function not implemented.");
                            }
                        },
                        url: "",
                        clone: function (): Request {
                            throw new Error("Function not implemented.");
                        },
                        body: null,
                        bodyUsed: false,
                        arrayBuffer: function (): Promise<ArrayBuffer> {
                            throw new Error("Function not implemented.");
                        },
                        blob: function (): Promise<Blob> {
                            throw new Error("Function not implemented.");
                        },
                        formData: function (): Promise<FormData> {
                            throw new Error("Function not implemented.");
                        },
                        json: function (): Promise<any> {
                            throw new Error("Function not implemented.");
                        },
                        text: function (): Promise<string> {
                            throw new Error("Function not implemented.");
                        }
                    }
                };
                const argument = "1";
                const expectedUrl = `${api}task/${argument}`
                const expected = { _id: 'mockTaskId' };
                mockFetchApiResponse(fetchApiDataSpy, expected);

                // Act
                const actual = await taskAndTagLoader(params);

                // Assert
                expect(fetchApiDataSpy).toHaveBeenNthCalledWith(1, expectedUrl, {})
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