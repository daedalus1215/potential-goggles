export const createMock = <T>(target: any, expected: T) => {
    if (target) {
        (target as jest.Mock).mockImplementationOnce(() => expected);
    }
};