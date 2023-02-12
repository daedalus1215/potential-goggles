export type UpdateDateTimeActionRequest = {
    params: {
        taskId: string;
    };
    body: DateTimeDto;
};
export type DateTimeDto = {
    id: string;
    date: string;
    time: string;
};
export type Response<T> = {
    jsonp: (data: T) => void
}
export type Task = {
    date: string;
    title: string;
    description:string;
    contactId:number;
    time: DateTimeDto,
    tags: any[]
} 