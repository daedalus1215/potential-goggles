import selectNormalizer, { EntityLabelOption, EntityNameOption } from '../selectNormalizer';

describe('src/utils/__test__/selectNormalizer.test.js', () => {
  describe('selectNormalizer', () => {
    it("should return 'value' and 'label' instead of 'taskId' and 'name' are present", () => {
      // Arrange
      const object: EntityNameOption[] = [
        { taskId: 1, name: 'name 1' },
        { taskId: 2, name: 'name 2' }
      ];
      const expected = [ 
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' }
      ];
      // Act
      const actual = selectNormalizer(object);

      // Assert
      expect(actual).toEqual(expected);
    });

    it("should return 'value' and 'label', when of 'value' and 'label' are present", () => {
      // Arrange
      const object: EntityLabelOption[] = [
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' }
      ];
      const expected = [
        { value: 1, label: 'name 1' },
        { value: 2, label: 'name 2' }
      ];
      // Act
      const actual = selectNormalizer(object);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
