import { inclusivelyFilter } from '../inclusivelyFilter.mjs';

describe('server/utils/__test__/filterInTags.test.mjs', () => {
    describe('filterInTags', () => {
        it('should return all tasks, when tags not provided', () => {
            // Arrange
            const expected = [
                { tags: ['tagName1', 'tagName2'] },
                { tags: ['tagName3', 'tagName4'] }
            ];

            // Act
            const actual = inclusivelyFilter(expected, null);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return only the tasks that have the tagName, when tags is provided', () => {
            // Arrange
            const expected = [{ 'tags': ['tagName1', 'tagName2'] }];
            const tasks = [{
                tags: [
                    'tagName3',
                    'tagName4',
                ]
            },
            ...expected
            ];
            const tags = 'tagName1';

            // Act
            const actual = inclusivelyFilter(tasks, tags);

            // Assert
            expect(actual).toEqual(expected);
        });

        it("should return the tasks that have a tag in it's collection tht has the same name", () => {
            // Arrange
            const expected = [
                { tags: ['tagName1', 'tagName2',] },
                { tags: ['tagName3', 'tagName4',] },
            ]
            const tasks = [
                { tags: ['tagName1', 'tagName2'] },
                { tags: ['tagName3', 'tagName4'] },
                { tags: ['tagName5', 'tagName6'] },
                { tags: ['tagName7', 'tagName8'] }
            ];
            const tags = 'tagName1, tagName3';

            // Act
            const actual = inclusivelyFilter(tasks, tags);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});