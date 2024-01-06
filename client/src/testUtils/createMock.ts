export const createMock = <T>(target:any, expected:T) => {
    (target as jest.Mock).mockImplementationOnce(() => expected);
};