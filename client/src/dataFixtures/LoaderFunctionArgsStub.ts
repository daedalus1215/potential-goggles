import { LoaderFunctionArgs } from "react-router-dom";

export const LoaderFunctionArgsStub: LoaderFunctionArgs = {
    params: {},
    request: {
        cache: "default",
        credentials: "include",
        destination: "",
        headers: {
            append: function (name: string, value: string): void {
                throw new Error("Function not implemented.");
            },
            delete: function (name: string): void {
                throw new Error("Function not implemented.");
            },
            get: function (name: string): string | null {
                throw new Error("Function not implemented.");
            },
            has: function (name: string): boolean {
                throw new Error("Function not implemented.");
            },
            set: function (name: string, value: string): void {
                throw new Error("Function not implemented.");
            },
            forEach: function (callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
                throw new Error("Function not implemented.");
            },
            entries: function (): IterableIterator<[string, string]> {
                throw new Error("Function not implemented.");
            },
            keys: function (): IterableIterator<string> {
                throw new Error("Function not implemented.");
            },
            values: function (): IterableIterator<string> {
                throw new Error("Function not implemented.");
            },
            [Symbol.iterator]: function (): IterableIterator<[string, string]> {
                throw new Error("Function not implemented.");
            }
        },
        integrity: "",
        keepalive: false,
        method: "",
        mode: "cors",
        redirect: "error",
        referrer: "",
        referrerPolicy: "",
        signal: {
            aborted: false,
            onabort: null,
            reason: undefined,
            throwIfAborted: function (): void {
                throw new Error("Function not implemented.");
            },
            addEventListener: function <K extends "abort">(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void {
                throw new Error("Function not implemented.");
            },
            removeEventListener: function <K extends "abort">(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void {
                throw new Error("Function not implemented.");
            },
            dispatchEvent: function (event: Event): boolean {
                throw new Error("Function not implemented.");
            }
        },
        url: "",
        clone: function (): Request {
            throw new Error("Function not implemented.");
        },
        body: null,
        bodyUsed: false,
        arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
        },
        blob: function (): Promise<Blob> {
            throw new Error("Function not implemented.");
        },
        formData: function (): Promise<FormData> {
            throw new Error("Function not implemented.");
        },
        json: function (): Promise<any> {
            throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
            throw new Error("Function not implemented.");
        }
    }
};