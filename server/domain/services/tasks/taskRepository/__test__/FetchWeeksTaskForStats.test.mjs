describe('server/domain/services/tasks/taskRepository/__test__/FetchWeeksTaskForStats.test.mjs', () => {
    describe('FetchWeeksTaskForStats', () => {
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
                            data: []
                        }
                    ]
                },
                options: {

                }
            };
            const bothTimesWillBePickedUp = {
                _id: "65139945996b7503bf8cb8f1",
                tags: [
                    "asdsdasdsa"
                ],
                time: [ 
                    {
                        _id: "64decee8de58d7e77212f4cc",
                        date: "2023-09-26T03:38:45.610Z",
                        time: 4200000 //@TODO: Left off here, we need to borrow millisToMinutesAndSeconds and 
                    },
                    {
                        _id: "64e816b5de58d7e77212fdfe",
                        date: "2023-09-20T02:59:08.155Z",
                        time: 600000
                    },
                ],
                contractId: 0,
                description: "<p>Dishes</p>\n<p>some paragraphs</p>",
                date: "2023-10-01T14:50:23.608Z"
            };
            const oneTimeWIllbePickedUp = {
                _id: "65139945996b7503bf8cb8f1",
                tags: [
                    "asdsdasdsa"
                ],
                time: [
                    {
                        _id: "64decee8de58d7e77212f4cc",
                        date: "2023-09-12T11:33:12.362Z",
                        time: 4200000
                    },
                    {
                        _id: "64e816b5de58d7e77212fdfe",
                        date: "2023-09-11T11:33:12.362Z",
                        time: 600000
                    },
                    {
                        _id: "64decee8de58d7e77212f4cc",
                        date: "2023-09-24T03:38:45.610Z",
                        time: 4200000
                    },
                ],
                contractId: 0,
                description: "<p>Misc</p>\n<p>some paragraphs</p>",
                date: "2023-09-12T11:33:12.362Z"
            };
            const noTimeWIllbePickedUp = {
                _id: "65139945996b7503bf8cb8f1",
                tags: [
                    "asdsdasdsa"
                ],
                time: [
                    {
                        _id: "64decee8de58d7e77212f4cc",
                        date: "2023-09-12T11:33:12.362Z",
                        time: 4200000
                    },
                    {
                        _id: "64e816b5de58d7e77212fdfe",
                        date: "2023-09-11T11:33:12.362Z",
                        time: 600000
                    },
                    {
                        _id: "64decee8de58d7e77212f4cc",
                        date: "2023-09-19T03:38:45.610Z",
                        time: 4200000
                    },
                ],
                contractId: 0,
                description: "<p>Not Gonna Find Us</p>\n<p>some paragraphs</p>",
                date: "2023-09-12T11:33:12.362Z"
            };
            const willFindTasks = [
                bothTimesWillBePickedUp,
                oneTimeWIllbePickedUp,

            ]
            const tasks = [
                ...willFindTasks,
                noTimeWIllbePickedUp
            ];
            // Act
            const actual = FetchWeeksTaskForStats(tasks);

            // Assert
            expect(actual).toEqual(expected)
        });
    });
});