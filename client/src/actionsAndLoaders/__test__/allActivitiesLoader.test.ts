describe('allActivitiesLoader', () => {
    it('should...', () => {
        // Arrange
        const request = {
            url: 'a url'
        };
        const expected = {};
        
        // Act
        const actual = allActivitiesLoader((({ request: { URL: api } }) as unknown as LoaderFunctionArgs))

        // Assert
        expect(actual).toEqual(expected);
    });
});