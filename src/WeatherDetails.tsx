import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface ISingleDayWeatherDetail {
  info: string;
  icon: React.ReactNode;
  value: string;
}

export interface IWeatherDetails {
  visibility: string;
  humidity: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  airPressure: string;
}

const SingleDayWeatherDetail = (props: ISingleDayWeatherDetail) => {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.info}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
};

const WeatherDetails = ({
  visibility,
  humidity,
  windSpeed,
  sunrise,
  sunset,
  airPressure,
}: IWeatherDetails) => {
  return (
    <>
      <SingleDayWeatherDetail
        icon={<LuEye />}
        info={"Visibility"}
        value={visibility}
      />
      <SingleDayWeatherDetail
        icon={<FiDroplet />}
        info={"Humidity"}
        value={humidity}
      />
      <SingleDayWeatherDetail
        icon={<MdAir />}
        info={"Air Pressure"}
        value={airPressure}
      />
      <SingleDayWeatherDetail
        icon={<ImMeter />}
        info={"Wind Speed"}
        value={windSpeed}
      />
      <SingleDayWeatherDetail
        icon={<LuSunrise />}
        info={"Sun rises"}
        value={sunrise}
      />
      <SingleDayWeatherDetail
        icon={<LuSunset />}
        info={"Sun sets"}
        value={sunset}
      />
    </>
  );
};

export default WeatherDetails;
