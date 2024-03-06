import { default as HttpError }  from '../../../../../../application/constants/HttpError.mjs';
import EntityToDto from '../EntityToDto';

describe('server/infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/__test__/EntityToDto.test.js', () => {
    describe('EntityToDto', () => {
        it('should take entity and return dto, add the time and convert milliseconds to minutes', () => {
            // Arrange
            const id = 'id';
            const contractId = 1;
            const date = '05/12/1999';
            const description = 'description';
            const tags = [
                {
                    'description': '<p>description</p>',
                    'id': 'tagId',
                },
            ];
            //@TODO: Can use datafixtures here
            const dateTimeOne ={
                'date': new Date('01/01/1010'),
                'id': 1,
                'time': '0:06',
            };

            const dateTimeTwo = {
                'date': new Date('02/02/2020'),
                'id': 2,
                'time': '0:06',
            }

            const expected = {
                taskId: id,
                contractId,
                date,
                dateTimes: [
                    dateTimeTwo,
                    dateTimeOne,
                ],
                description,
                tags,
                time: 12000,
                title: "<p>description</p>"
            }

            const doc = {
                _id: id,
                description,
                title: "<p>description</p>",
                tags,
                date,
                contractId,
                time: [
                    {
                        _id: 2,
                        date: dateTimeTwo.date,
                        time: 6000
                    },
                    {
                        _id: 1,
                        date: dateTimeOne.date,
                        time: 6000
                    }
                ]
            }

            // Act
            const actual = EntityToDto(doc);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should take empty entity and return HttpError', () => {
            // Arrange
            const id = 'id';
            const contractId = 1;
            const date = '05/12/1999';
            const description = 'description';
            const tags = [
                {
                    'description': 'description',
                    'id': 'tagId',
                },
            ];

            const expected = new HttpError(404, 'Not Found')

            const doc = null

            // Act
            const actual = EntityToDto(doc);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});