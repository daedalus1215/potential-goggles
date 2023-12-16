import { updateDateTime } from "../actions";

const fetchApiData = jest.fn()

jest.mock('@/utils/fetchApiData', () => ({
    default: () => fetchApiData
}));

jest.mock('@/config.json', () => ({
    'api': 'apiMock/'
}))

describe('client/src/actionsAndLoaders/__test__/actions.test.ts', () => {
    describe('#updateDateTime', () => {
        it('updateDateTime', () => {
            // Arrange

            // Act
            updateDateTime({
                params: {},
                request: {
                    formData: () => new Promise(() => ({
                        get: (key:string): any => {
                            const hashing: { [key: string]: string } = { 'id': 'someId' };                            const d = hashing[key] as string
                            return d;
                        }
                    }))
                }
            })
            // Assert
        });
    });
});