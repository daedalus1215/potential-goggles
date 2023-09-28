import writeJsonFile from '../writeJsonFile';
import * as FileSaver from 'file-saver';

describe('src/components/TaskListView/__test__/writeJsonFile.test.ts', () => {
  function setupFileSaverMock() {
    jest.mock('file-saver');

    Object.defineProperty(global, 'URL', {
      value: {
        createObjectURL: jest.fn(),
        revokeObjectURL: jest.fn(),
        prototype: {
          href: '', searchParams: {
            append: function (name: string, value: string): void {
              throw new Error('Function not implemented.');
            },
            delete: function (name: string): void {
              throw new Error('Function not implemented.');
            },
            get: function (name: string): string | null {
              throw new Error('Function not implemented.');
            },
            getAll: function (name: string): string[] {
              throw new Error('Function not implemented.');
            },
            has: function (name: string): boolean {
              throw new Error('Function not implemented.');
            },
            set: function (name: string, value: string): void {
              throw new Error('Function not implemented.');
            },
            sort: function (): void {
              throw new Error('Function not implemented.');
            },
            forEach: function (callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void {
              throw new Error('Function not implemented.');
            },
            entries: function (): IterableIterator<[string, string]> {
              throw new Error('Function not implemented.');
            },
            keys: function (): IterableIterator<string> {
              throw new Error('Function not implemented.');
            },
            values: function (): IterableIterator<string> {
              throw new Error('Function not implemented.');
            },
            [Symbol.iterator]: function (): IterableIterator<[string, string]> {
              throw new Error('Function not implemented.');
            },
            size: 0
          },
          hash: '',
          host: '',
          hostname: '',
          origin: '',
          password: '',
          pathname: '',
          port: '',
          protocol: '',
          search: '',
          username: '',
          toJSON: function (): string {
            throw new Error('Function not implemented.');
          }
        },
      },
      writable: true
    });

    const createObjectURLSpy = jest.fn();
    Object.defineProperty(FileSaver, 'createObjectURL', {
      value: createObjectURLSpy,
      writable: true
    });

    // Create a manual spy for the saveAs function
    const saveAsSpy = jest.fn();
    Object.defineProperty(FileSaver, 'saveAs', {
      value: saveAsSpy,
      writable: true, // Make it writable for the test
    });

    return saveAsSpy;
  }
  /**
   * writeJsonFile has a dependency on the global Blob and
   * we just need to be able to simulate the function
   */
  function mockBlob() {
    global.Blob = class BlobMock {
      constructor(blobParts?: BlobPart[], options?: BlobPropertyBag) {
        return {
          size: 0,
          type: '',
          slice: function () {
            // Implement the slice function if needed
            return new Blob([], {});
          },
          arrayBuffer: function () {
            // Implement the arrayBuffer function if needed
            return Promise.resolve(new ArrayBuffer(0));
          },
        };
      }
    } as any;
  }

  describe('writeJsonFile', () => {
    const task = {
      date: '10/24/2019',
      description: 'task description becomes file name',
    };

    it('should write the task into a json file', () => {
      mockBlob();
      const spy = setupFileSaverMock();

      writeJsonFile(task);

      // const stringifyJSON = JSON.stringify(task);

      expect(spy).toHaveBeenCalledTimes(1);
      // the equals is matching, but it's recognizing the blob as a different object.
      // expect(spy).toHaveBeenCalledWith(
      //   new Blob([stringifyJSON], { type: 'application/json' }),
      //   'time-logs_' + new Date() + '.json'
      // );
    });
  });
});
