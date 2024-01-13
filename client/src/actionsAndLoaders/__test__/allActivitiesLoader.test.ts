import { LoaderFunctionArgs } from "react-router-dom";
import { allActivitiesLoader } from "../allActivitiesLoader";
import { createRequest } from "@/testUtils/createRequest";

import {
    fetchAllDayTasks,
    fetchTodaysActivities,
    fetchAllMonthTasks,
    fetchTags
} from "../loaders";
import { AggregateActivity } from "@/interfaces";
import { createMock } from "@/testUtils/createMock";
import { aggregateActivityFixture } from "@/dataFixtures/aggregateActivityFixture";

jest.mock('../loaders', () => ({
    fetchAllDayTasks: jest.fn(),
    fetchTodaysActivities: jest.fn(),
    fetchAllMonthTasks: jest.fn(),
    fetchTags: jest.fn(),
}));

describe('allActivitiesLoader', () => {
    describe('with no arguments', () => {
        it('should invoke appropriate fetchers and returns null for queryDate, queryExcludeTags, and queryIncludeTags', async () => {
            // Arrange
            const request = createRequest();
            console.log('request11', request)
            const allActivities: AggregateActivity = aggregateActivityFixture();
            const todaysActivities: AggregateActivity = aggregateActivityFixture();
            const expectedAllMonthTasks: AggregateActivity = aggregateActivityFixture();
            const tags = [{ id: 'tagId' }];
            const expected = {
                allActivities: allActivities,
                monthActivities: expectedAllMonthTasks,
                options: [undefined,],
                queryDate: null,
                queryExcludeTags: null,
                queryIncludeTags: null,
                tags,
                todaysActivities: todaysActivities,
            };
            createMock(fetchAllDayTasks, allActivities);
            createMock(fetchTodaysActivities, todaysActivities);
            createMock(fetchAllMonthTasks, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request as unknown as LoaderFunctionArgs);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
    describe('date, but no other arguments', () => {
        it('should invoke appropriate fetchers and returns expected queryDate, but null for queryExcludeTags and queryIncludeTags', async () => {
            // Arrange
            const request = createRequest(undefined, 'activities/all?date=2023-09-14');
            const allActivities: AggregateActivity = aggregateActivityFixture();
            const todaysActivities: AggregateActivity = aggregateActivityFixture();
            const expectedAllMonthTasks: AggregateActivity = aggregateActivityFixture();
            const tags = [{ id: 'tagId' }];
            const expected = {
                allActivities: allActivities,
                monthActivities: expectedAllMonthTasks,
                options: [undefined,],
                queryDate: '2023-09-14',
                queryExcludeTags: null,
                queryIncludeTags: null,
                tags,
                todaysActivities: todaysActivities,
            };
            createMock(fetchAllDayTasks, allActivities);
            createMock(fetchTodaysActivities, todaysActivities);
            createMock(fetchAllMonthTasks, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request as unknown as LoaderFunctionArgs);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
    describe('date, includeTags, but not excludeTags', () => {
        it('should invoke appropriate fetchers and returns expected queryDate and queryExcludeTags, but null for queryIncludeTags', async () => {
            // Arrange
            const request = createRequest(undefined, 'activities/all?date=2023-09-14&includeTags=includeMeTag');
            const allActivities: AggregateActivity = aggregateActivityFixture();
            const todaysActivities: AggregateActivity = aggregateActivityFixture();
            const expectedAllMonthTasks: AggregateActivity = aggregateActivityFixture();
            const tags = [{ id: 'tagId' }];
            const expected = {
                allActivities: allActivities,
                monthActivities: expectedAllMonthTasks,
                options: [undefined,],
                queryDate: '2023-09-14',
                queryExcludeTags: null,
                queryIncludeTags: 'includeMeTag',
                tags,
                todaysActivities: todaysActivities,
            };
            createMock(fetchAllDayTasks, allActivities);
            createMock(fetchTodaysActivities, todaysActivities);
            createMock(fetchAllMonthTasks, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
    describe('date, includeTags, and excludeTags', () => {
        it('should invoke appropriate fetchers and returns expected queryDate, queryExcludeTags, and queryIncludeTags', async () => {
            // Arrange
            const queryExcludeTags = "exclude1,exclude2";
            const queryIncludeTags = "includeMeTag";
            const queryDate = "2023-09-14";
            const request = createRequest(undefined, `activities/all?date=${queryDate}&includeTags=${queryIncludeTags}&excludeTags=${queryExcludeTags}`);
            const allActivities: AggregateActivity = aggregateActivityFixture();
            const todaysActivities: AggregateActivity = aggregateActivityFixture();
            const expectedAllMonthTasks: AggregateActivity = aggregateActivityFixture();
            const tags = [{ id: 'tagId' }];
            const expected = {
                allActivities: allActivities,
                monthActivities: expectedAllMonthTasks,
                options: [undefined],
                queryDate,
                queryExcludeTags,
                queryIncludeTags,
                tags,
                todaysActivities,
            };
            createMock(fetchAllDayTasks, allActivities);
            createMock(fetchTodaysActivities, todaysActivities);
            createMock(fetchAllMonthTasks, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request as unknown as LoaderFunctionArgs);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});