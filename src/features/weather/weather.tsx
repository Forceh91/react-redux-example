import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTemp,
  selectWind,
  incrementTemp,
  decrementTemp,
  incrementTempByAmount,
  incrementWind,
  decrementWind,
  incrementWindByAmount,
} from "./weatherSlice";

export function Weather() {
  const temp = useSelector(selectTemp);
  const wind = useSelector(selectWind);
  const dispatch = useDispatch();

  const [incrementTempAmount, setIncrementTempAmount] = useState(-5);
  const [incrementWindAmount, setIncrementWindAmount] = useState(5);

  const getWindchill = (): number => {
    if (temp > 0) return 0;

    // the old windchill system was a number based off temp and wind speed, rather than just a random temp
    // this is calculated as below, then rounded up to the nearest 50, if its >= 1350 then windchill should be shown
    const tempAsFloat: number = temp;
    const windSpeed: number = wind;
    const windSpeedMs: number = windSpeed / 3.6;

    const windchill = Math.floor(
      (12.1452 + 11.6222 * Math.sqrt(windSpeedMs) - 1.16222 * windSpeedMs) * (33 - tempAsFloat)
    );

    // round it to nearest 50 and if its >= 1200 with a windspeed >= 10 its relevant
    const roundedWindchill = Math.round(windchill / 50) * 50;
    return roundedWindchill >= 1200 && windSpeed >= 10 ? roundedWindchill : 0;
  };

  const getWindchillSeverity = (windchill: number): string => {
    if (windchill >= 2300) return "extreme";
    if (windchill >= 2000) return "very hazardous";
    if (windchill >= 1800) return "hazardous";
    if (windchill >= 1600) return "risky";
    return "uncomfortable";
  };

  const WindChillString = () => {
    const windchill: number = getWindchill();
    if (!windchill) return <span>Not relevant</span>;

    const severity = getWindchillSeverity(windchill);
    return (
      <span>
        {windchill} ms2 ({severity})
      </span>
    );
  };

  return (
    <div>
      <div>
        <span>
          Windchill: <WindChillString />
        </span>
      </div>
      <div>
        <button aria-label="Increment temp" onClick={() => dispatch(incrementTemp())}>
          Increment
        </button>
        <span>Temp: {temp}c</span>
        <button aria-label="Decrement temp" onClick={() => dispatch(decrementTemp())}>
          Decrement
        </button>
      </div>
      <div>
        <button aria-label="Increment wind" onClick={() => dispatch(incrementWind())}>
          Increment
        </button>
        <span>Wind: {wind}kmh</span>
        <button aria-label="Decrement temp" onClick={() => dispatch(decrementWind())}>
          Decrement
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment temp amount"
          value={incrementTempAmount}
          onChange={(e) => setIncrementTempAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementTempByAmount(Number(incrementTempAmount) || 0))}>
          Add Temp Amount
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment wind amount"
          value={incrementWindAmount}
          onChange={(e) => setIncrementWindAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementWindByAmount(Number(incrementWindAmount) || 0))}>
          Add Wind Amount
        </button>
      </div>
    </div>
  );
}
