import axios, {AxiosRequestConfig} from "axios";

export async function fetchPuzzleInput(day: number): Promise<string> {
  const request: AxiosRequestConfig = {
    method: 'get',
    url: `https://adventofcode.com/2021/day/${day}/input`,
    headers: {
      'Cookie': 'session=53616c7465645f5f1939e03e36fdd7d4d350cb83798649ade03794d42ef2925f73c1cb6acb218a17c080419abd957e78'
    }
  };
  let response = await axios(request);
  return response.data;
}