export function msgBody(msg: string, body?: any, err?: any) {
  return {
    body: body,
    msg: msg,
    err: err,
  };
}