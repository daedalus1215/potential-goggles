import { filterOutTags } from "../filterOutTags.mjs";

describe('server/utils/__test__/filterOutTags.test.mjs', () => {
    describe('filterOutTags', () => {
        it('should return all tasks, when tags not provided', () => {
            // Arrange
            const expected = [
                { tags: ['tagName1', 'tagName2'] },
                { tags: ["tagName3", "tagName4"] }
            ];

            // Act
            const actual = filterOutTags(expected, null);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return only the tasks that do not have the tagName, when tags is provided', () => {
            // Arrange
            const expected = [{ "tags": ["tagName3", "tagName4"] }];
            const tasks = [{
                tags: [
                    'tagName1',
                    'tagName2'
                ]
            },
            ...expected
            ];
            const tags = "tagName1";

            // Act
            const actual = filterOutTags(tasks, tags);

            // Assert
            expect(actual).toEqual(expected);
        });
        it('should return..', () => {
            // Arrange
            const expected = []
            const tasks = [
                { tags: ['tagName1', 'tagName2'] },
                { tags: ["tagName3", "tagName4"] }
            ];
            const tags = "tagName1, tagName3";

            // Act
            const actual = filterOutTags(tasks, tags);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});