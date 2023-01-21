const EntityToDto = require('../EntityToDto');

describe('server/infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/__test__/EntityToDto.test.js', () => {
    describe('EntityToDto', () => {
        it('should take entity and return dto, add the time and convert milliseconds to minutes', () => {
            // Arrange
            const id = "id";
            const contractId = 1;
            const date = "05/12/1999";
            const description = "description";
            const tags = [
                {
                    "description": "description",
                    "id": "tagId",
                },
            ];

            const expected = {
                _id: id,
                contractId,
                date,
                dateTimes: [
                    {
                        "date": "01/01/1010",
                        "id": 1,
                        "time": "0:06",
                    },
                    {
                        "date": "02/02/2020",
                        "id": 2,
                        "time": "0:06",
                    },
                ],
                description,
                tags,
                time: 12000,
            }

            const doc = {
                _id: id,
                description,
                tags,
                date,
                contractId,
                time: [
                    {
                        _id: 1,
                        date: '01/01/1010',
                        time: 6000
                    },
                    {
                        _id: 2,
                        date: '02/02/2020',
                        time: 6000
                    }
                ]
            }

            // Act
            const actual = EntityToDto(doc);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});