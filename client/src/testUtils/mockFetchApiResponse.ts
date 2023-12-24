export const mockFetchApiResponse = (fetchApiSpy:any, response:any) => {
    fetchApiSpy.mockReturnValueOnce(response);
}