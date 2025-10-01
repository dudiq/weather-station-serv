import type {MetNoWeatherValueObject} from "../types/met-no-weather.value-object";

type TTimeseries = MetNoWeatherValueObject['properties']['timeseries'][0]

export function extractDayData(timeseries: TTimeseries[]) {
  const result: {
    datetime: Date,
    night: TTimeseries
    day: TTimeseries
  }[] = [];
  const grouped: Record<string, TTimeseries[]> = {};

  for (const item of timeseries) {
    const date = new Date(item.time);
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    const monthDay = date.getTime()

    if (!grouped[monthDay]) {
      grouped[monthDay] = [];
    }
    grouped[monthDay].push(item);
  }

  for (const [monthDay, items] of Object.entries(grouped)) {
    const midnight = items.reduce((closest, current) => {
      const currentHour = new Date(current.time).getUTCHours();
      const closestHour = new Date(closest.time).getUTCHours();
      return Math.abs(currentHour - 0) < Math.abs(closestHour - 0) ? current : closest;
    });

    const midday = items.reduce((closest, current) => {
      const currentHour = new Date(current.time).getUTCHours();
      const closestHour = new Date(closest.time).getUTCHours();
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
    });

    result.push({
      datetime: new Date(Number(monthDay)),
      night: midnight,
      day: midday
    });
  }

  return result;
}
