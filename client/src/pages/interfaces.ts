export type ActionInterface = ({ request, params }: { request: any, params: any }) => void;
export type ErrorInterface = {
    statusText: string;
    message: string;
}