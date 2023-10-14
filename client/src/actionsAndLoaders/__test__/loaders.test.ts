import { addQuestionMarkIfRequired } from "../loaders";

describe('client/src/actionsAndLoaders/loaders.ts', () => {
    describe('loaders', () => {
        describe('addQuestionMarkIfRequired', () => {
            it('should return with a "?" if none given', () => {
                // Arrange
                const url = 'http://192.168.1.238:5173/stats';
                const expected = {url: url + '?'};

                // Act
                const actual = addQuestionMarkIfRequired({ url } as Request);

                // Assert
                expect(actual).toEqual(expected);
            });
            
            it('should return with a "&" if "?" given', () => {
                // Arrange
                const url = 'http://192.168.1.238:5173/stats?';
                const expected = {url: url + '&'};

                // Act
                const actual = addQuestionMarkIfRequired({ url } as Request);

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
})