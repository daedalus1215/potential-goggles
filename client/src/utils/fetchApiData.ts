
async function fetchApiData<T>(url:string, params: {body?:any, headers?:{}, method?:string}):Promise<T> {
  const { body, ...settings } = params;
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...settings,
    headers: {
      ...headers,
      ...settings.headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, config);
  const data = await response.json();
  return data;
};

export default fetchApiData;
