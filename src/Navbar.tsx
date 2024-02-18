import {
  MdLocationPin,
  MdOutlineLocationOn,
  MdOutlineWbSunny,
} from "react-icons/md";
import Search from "./Search";
import { useState } from "react";
import axios from "axios";

const API_KEY = "";

export interface INavbar {
  location: string;
}

const Navbar = ({ location }: INavbar) => {
  const [city, setCity] = useState("");
  const [error, setErr] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useState("");
  const [_, setLoading] = useState(false);

  const handleChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(`API_URL${value}&appid=${API_KEY}`);
        const suggestion = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestion);
        setErr("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);

        console.log(error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length === 0) {
      setErr("Location not found");
      setLoading(false);
    } else {
      setErr("");
      setTimeout(() => {
        setLoading(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 1500);
    }
  };

  return (
    <div className="shadow-sm sticky top-0 left-0 bg-white z-50">
      <div className="h-[80px] w-full fled justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdOutlineWbSunny className="text-3xl mt-1 text-yellow-300" />
        </div>
        <section className="flex gap-2 items-center">
          <MdLocationPin className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">Georgia</p>
          <div>
            <Search
              onChange={(e) => handleChange(e.target.value)}
              onSubmit={handleSubmit}
              value={city}
              className={""}
            />
            <SuggestionBox
              {...{
                suggestions,
                showSuggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              className="cursor-pointer p-1 rounded"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li className="cursor-pointer p-1 rounded hover:bg-gray-200"></li>
        </ul>
      )}
    </>
  );
}

export default Navbar;
