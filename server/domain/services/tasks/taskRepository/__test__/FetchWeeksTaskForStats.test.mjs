import { dishesTask, hiddenTask, miscTask } from "../../../../../dataFixtures/TaskFixture.mjs";
import TaskModel from "../../../../../infrastructure/models/TaskModel";
import FetchWeeksTaskForStats from "../FetchWeeksTaskForStats.mjs";

describe('server/domain/services/tasks/taskRepository/__test__/FetchWeeksTaskForStats.test.mjs', () => {
    describe('FetchWeeksTaskForStats', () => {
        beforeEach(() => {
            jest.mock("../../../../../infrastructure/models/TaskModel");
        });
        it('should...', () => {
            // Arrange
            const expected = {
                data: {
                    labels: [
                        "2023-09-26",
                        "2023-09-25",
                        "2023-09-24",
                        "2023-09-23",
                        "2023-09-22",
                        "2023-09-21",
                        "2023-09-20"
                    ],
                    datasets: [
                        {
                            label: "Dishes",
                            data: [4200001, 0, 0, 0, 0, 0, 600001],
                            backgroundColor: expect.anything()
                        },
                        {
                            label: "Misc",
                            data: [0, 0, 4200014, 0, 0, 0, 0],
                            backgroundColor: expect.anything()
                        }
                    ]
                },
                options: {
                    "plugins": {
                        "title": {
                            "display": true,
                            "text": "Chart.js Bar Chart - Stacked"
                        }
                    },
                    "responsive": true,
                    "scales": {
                        "x": {
                            "stacked": true
                        },
                        "y": {
                            "stacked": true
                        }
                    }
                }
            };
            const bothTimesWillBePickedUp = dishesTask;
            const oneTimeWIllbePickedUp = miscTask;
            const noTimeWIllbePickedUp = hiddenTask;
            const tasks = [
                bothTimesWillBePickedUp,
                oneTimeWIllbePickedUp,
                noTimeWIllbePickedUp
            ];
            TaskModel.find = jest.fn().mockImplementation(() => tasks);

            // Act
            const actual = FetchWeeksTaskForStats(new Date("2023-09-26T12:00:00.000Z"));

            console.log('actual', actual.data.datasets)
            // Assert
            expect(actual).toEqual(expected)
        });
    });
});