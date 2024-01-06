import { LoaderFunctionArgs } from "react-router-dom";
import { allActivitiesLoader } from "../allActivitiesLoader";
import { createRequest } from "@/testUtils/createRequest";

import {
    fetchAllDayTasks,
    fetchTodaysActivities,
    fetchAllMonthTasksAction,
    fetchTags
} from "../loaders";
import { AggregateActivity } from "@/interfaces";
import { createMock } from "@/testUtils/createMock";
import { aggregateActivityFixture } from "@/dataFixtures/aggregateActivityFixture";

jest.mock('../loaders', () => ({
    fetchAllDayTasks: jest.fn(),
    fetchTodaysActivities: jest.fn(),
    fetchAllMonthTasksAction: jest.fn(),
    fetchTags: jest.fn(),
}));

describe('allActivitiesLoader', () => {
    describe('with no arguments', () => {
        it('should invoke appropriate fetchers and returns null for queryDate, queryExcludeTags, and queryIncludeTags', async () => {
            // Arrange
            const request = createRequest();
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
            createMock(fetchAllMonthTasksAction, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request as unknown as LoaderFunctionArgs);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
    describe('date, but no other arguments', () => {
        it('should invoke appropriate fetchers and returns expected queryDate and null for queryExcludeTags and queryIncludeTags', async () => {
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
            createMock(fetchAllMonthTasksAction, expectedAllMonthTasks);
            createMock(fetchTags, tags);

            // Act
            const actual = await allActivitiesLoader(request as unknown as LoaderFunctionArgs);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
    //@TODO: Do the others with args
});