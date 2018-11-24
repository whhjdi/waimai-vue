export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let reg = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getUTCHours(),
    "m+": date.getUTCMinutes(),
    "s+": date.getUTCSeconds()
  };
  for (let key in reg) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = reg[key] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : addZero(str));
    }
  }
  return fmt
}

function addZero(str) {
  return ("00" + str).substr(str.length);
}
