export const GET = 'GET';
export const PUT = 'PUT';
export const POST = 'POST';
export const DELETE = 'DELETE' as const;

export const TEN_SECONDS = 10000;

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// flash message
export type FLASH_MESSAGE_TYPES = 'success' | 'error' | 'info';
export const FLASH_MESSAGE = 'FLASH_MESSAGE'

// fetchTaskById
export const FETCH_TASK_BY_ID = 'FETCH_TASK_BY_ID';
export const FETCH_TASK_BY_ID_RESPONSE_SUCCESS = 'FETCH_TASK_BY_ID_RESPONSE_SUCCESS';

// fetchAllTasks
export const FETCH_ALL_TASKS = 'FETCH_ALL_TASKS';
export const FETCH_ALL_TASKS_RESPONSE = 'FETCH_ALL_TASKS_RESPONSE';

// putTaskById
export const PUT_TASK_BY_ID = 'PUT_TASK_BY_ID';
export const PUT_TASK_BY_ID_RESPONSE = 'PUT_TASK_BY_ID_RESPONSE';
export const PUT_TASK_BY_ID_RESPONSE_SUCCESS = 'PUT_TASK_BY_ID_RESPONSE_SUCCESS';
export const PUT_TASK_BY_ID_RESPONSE_ERROR = 'PUT_TASK_BY_ID_RESPONSE_ERROR';

// fetchAllTags
export const FETCH_ALL_TAGS = 'FETCH_ALL_TAGS';
export const FETCH_TAGS_RESPONSE = 'FETCH_TAGS_RESPONSE';

export const FETCH_TAG_BY_ID = 'FETCH_TAG_BY_ID';
export const FETCH_TAG_BY_ID_RESPONSE = 'FETCH_TAG_BY_ID_RESPONSE';

// dateTimes
export const UPDATE_DATE_TIME = 'UPDATE_DATE_TIME';
export const UPDATE_DATE_TIME_RESPONSE = 'UPDATE_DATE_TIME_RESPONSE';

// tags
export const UPDATE_TAG_BY_ID = 'UPDATE_TAG_BY_ID';
export const UPDATE_TAG_BY_ID_RESPONSE = 'UPDATE_TAG_BY_ID_RESPONSE';
// put tag
export const PUT_TAG = 'PUT_TAG';
export const PUT_TAG_RESPONSE = 'PUT_TAG_RESPONSE';
// post tag
export const POST_TAG = 'POST_TAG';
export const POST_TAG_RESPONSE = 'POST_TAG_RESPONSE';
// delete tag
export const DELETE_TAG = 'DELETE_TAG'
export const DELETE_TAG_RESPONSE = 'DELETE_TAG_RESPONSE'