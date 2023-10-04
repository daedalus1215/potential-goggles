import { DishTask, hiddenTask, miscTask } from "../../../../../dataFixtures/TaskFixture.mjs";
import TaskModel from "../../../../../infrastructure/models/TaskModel";

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
                            data: [4200000, 0, 0, 0, 0, 0, 600000],
                            backgroundColor: 'rgb(197, 125, 206)'
                        },
                        {
                            label: "Misc",
                            data: [0, 0, 4200000, 0, 0, 0, 0],
                            backgroundColor: 'rgb(202, 249, 211)'
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
            const bothTimesWillBePickedUp = DishTask;
            const oneTimeWIllbePickedUp = miscTask;
            const noTimeWIllbePickedUp = hiddenTask;
            const willFindTasks = [
                bothTimesWillBePickedUp,
                oneTimeWIllbePickedUp,

            ]
            const tasks = [
                ...willFindTasks,
                noTimeWIllbePickedUp
            ];
            TaskModel.find = jest.fn().mockImplementation(() => tasks);

            // Act
            const actual = FetchWeeksTaskForStats(new Date("2023-09-26T00:00:00.000Z"));

            // Assert
            expect(actual).toEqual(expected)
        });
    });
});