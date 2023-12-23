export const mockRedirect = (redirect:any, response:any) => {
    (redirect as jest.Mock).mockImplementationOnce(() => response);
};