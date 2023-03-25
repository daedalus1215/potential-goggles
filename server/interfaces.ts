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
    _id: string;
    date: string;
    title: string;
    description:string;
    contactId:number;
    time: DateTimeDto,
    tags: any[]
} 

export type DateTime = { 
    _id: string;
    time: string;
    date: string;
}

export type TaskTitle = {
    title:string;
    id: string;
}

export type DayActivity = {
    titles: string[];
    date: Date;
    time: number;
}