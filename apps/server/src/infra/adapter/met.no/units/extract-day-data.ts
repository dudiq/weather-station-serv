import type {MetNoWeatherValueObject} from "../types/met-no-weather.value-object";

type TTimeseries = MetNoWeatherValueObject['properties']['timeseries'][0]

// TODO: add old temp values for current day only

export function extractDayData(timeseries: TTimeseries[]) {
  const result: {
    datetime: Date,
    day: TTimeseries,
    temp: { min: number, max: number }
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
    let tempMin = items[0]?.data.instant.details.air_temperature || -100
    let tempMax = items[0]?.data.instant.details.air_temperature || 100
    items.forEach(item => {
      if (item.data.instant.details.air_temperature < tempMin) {
        tempMin = item.data.instant.details.air_temperature
      }
      if (item.data.instant.details.air_temperature > tempMax) {
        tempMax = item.data.instant.details.air_temperature
      }
    })

    const midday = items.reduce((closest, current) => {
      const currentHour = new Date(current.time).getHours();
      const closestHour = new Date(closest.time).getHours();
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
    });

    result.push({
      datetime: new Date(Number(monthDay)),
      day: midday,
      temp: {
        min: tempMin,
        max: tempMax
      }
    });
  }

  return result;
}
