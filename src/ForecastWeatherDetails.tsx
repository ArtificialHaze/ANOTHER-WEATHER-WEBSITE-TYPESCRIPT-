import Container from "./Container";
import WeatherDetails, { IWeatherDetails } from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";
import { convertKelvinToCelsius } from "./convertKelvinToCelsius";

export interface IForecastWeatherDetails extends IWeatherDetails {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetails(props: IForecastWeatherDetails) {
  const {
    weatherIcon,
    date,
    day,
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <Container classID="gap-4">
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
