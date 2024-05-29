import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function bytesToHumanFileSize(size: number) {
  /* Converts a number (in bytes) to a human-readable value
   * credits: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
   */
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export const escapeHtml = (unsafe: string) => {
  /* basic HTML escape method to sanitize file name
   * credits: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
   */
  const replacements: { [index: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  let res = unsafe;
  for (const rep in replacements)
    res = res.replace(rep, replacements[rep])
  return res
}

export const unescapeHtml = (safe: string) => {
  /* basic HTML unescape method to sanitize file name */
  const replacements: { [index: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  let res = safe;
  for (const rep in replacements)
    res = res.replace(replacements[rep], rep)
  return res
}
