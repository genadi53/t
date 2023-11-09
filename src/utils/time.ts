export function convertSecondsToReadableTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;

  if (!!hours) {
    return `${hours < 10 ? `0${hours}` : hours}:${minutesStr}:${secondsStr}`;
  }

  return `${minutesStr}:${secondsStr}`;
}
