import axios from "axios";
import "./App.css";
import Navbar from "./Navbar";
import { useQuery } from "react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./Container";
import { convertKelvinToCelsius } from "./convertKelvinToCelsius";
import WeatherIcon from "./WeatherIcon";
import { getDayOrNightIcon } from "./getDayOrNight";
import WeatherDetails from "./WeatherDetails";
import { metersToKilometers } from "./metersToKilometers";
import { convertWindSpeed } from "./convertWindSpeed";
import ForecastWeatherDetails from "./ForecastWeatherDetails";
import { useEffect, useState } from "react";

const API_KEY = "985cc59d1c411bf97de3ba0976f293e9";

const App = () => {
  const [place, setPlace] = useState("");
  const [loading, _] = useState(false);

  const { isLoading, error, data, refetch } = useQuery("repoData", async () => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`
    );
    return data;
  });

  useEffect(() => {
    refetch();
  }, [place, data]);

  const firstData = data?.list[0];

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading..</p>
      </div>
    );

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen gap-4">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <>{/* {!loading && } */}</>
        <section className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-1 text-2xl items-center">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
              </p>
            </div>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                  </span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_text), "h:mm a")}
                    </p>
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_text)}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_text ?? ""
                )}
              />
            </Container>
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                humidity={`${firstData?.main.humidity}%`}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1700123123),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 152123123),
                  "H:mm"
                )}
                airPressure={`${firstData.main.pressure}hpa`}
              />
            </Container>
          </div>
        </section>
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">7 Days Forecast</p>
          <ForecastWeatherDetails
            weatherIcon=""
            date=""
            day=""
            temp={0}
            feels_like={0}
            temp_min={0}
            temp_max={0}
            description=""
            visibility=""
            humidity=""
            windSpeed=""
            sunrise=""
            sunset=""
            airPressure=""
          />
        </section>
      </main>
    </div>
  );
};

export default App;
