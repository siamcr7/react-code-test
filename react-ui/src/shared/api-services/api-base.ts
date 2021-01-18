import axios from "axios";
import { from, Observable } from "rxjs";

export function httpGet$<TResult>(url: string): Observable<TResult> {
  return from(axios.get<TResult>(url).then(res => res.data));
}

export function httpPost$<TResult, TPayload>(url: string, payload: TPayload): Observable<TResult> {
  return from(axios.post<TResult>(url, payload).then(res => res?.data));
}

export function httpPut$<TResult, TPayload>(url: string, payload: TPayload): Observable<TResult> {
  return from(axios.put<TResult>(url, payload).then(res => res?.data));
}

export function httpDelete$<TResult>(url: string): Observable<TResult> {
  return from(axios.delete<TResult>(url).then(res => res.data));
}