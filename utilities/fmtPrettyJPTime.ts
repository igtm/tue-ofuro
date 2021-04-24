/**
 * 秒数を "h:mm:ss" に変換する
 */
export function fmtPrettyJPTime(sec: number): string {
  const hour = Math.floor(sec / 3600);
  const min = `${Math.floor(sec / 60) % 60}`.padStart(2, "0");
  const secOnly = `${sec % 60}`.padStart(2, "0");
  let ret = "";
  if (hour > 0) {
    ret += `${hour}:`;
  }
  ret += `${min}:${secOnly}`;
  return ret;
}
