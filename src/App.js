import { useEffect, useRef, useState } from "react";
import SvgGauge from "svg-gauge";
import "./App.css";

/**
 * @Gauge return svg-gauge.
 * URL:[https://github.com/naikus/svg-gauge,https://www.npmjs.com/package/svg-gauge]
 */

const Gauge = (props) => {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef(null);

  useEffect(() => {
    const value = props?.defaultOptions;
    if (!gaugeRef.current) {
      const options = { ...value, ...props };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(options.initialValue);
    }
    gaugeRef.current.setValueAnimated(props.value, 1);
  }, [props]);

  return <div ref={gaugeEl} className="gauge-container" />;
};

const App = () => {
  const [miniValue, setMinimumValue] = useState(-1000);
  const [maxValue, setMaximumValue] = useState(1000);
  const [value, setValue] = useState(50);

  const defaultOptions = {
    animDuration: 1,
    showValue: true,
    initialValue: Number(miniValue),
    min: Number(miniValue),
    max: Number(maxValue),
    dialStartAngle: 180,
    dialEndAngle: 0,
    radius: 60,
    value: value,
    gaugeClass: "gaugeClass",
    dialClass: "dialClass",
    valueDialClass: "valueDialClass",
    valueClass: "valueClass",
  };

  return (
    <div className="continer">
      <div>
        <Gauge
          defaultOptions={defaultOptions}
          value={value}
          miniValue={miniValue}
          maxValue={maxValue}
          label={function (value) {
            return Math.round(value) + "%";
          }}
          color={function (value) {
            if (value < -25) {
              return "#5ee432";
            } else if (value < 0) {
              return "#fffa50";
            } else if (value < 25) {
              return "#f7aa38";
            } else {
              return "#ef4655";
            }
          }}
        />
      </div>
      <div className="text-box-div">
        <input
          type="text"
          placeholder="minimum value"
          name="min"
          defaultValue={miniValue}
          onChange={(event) => setMinimumValue(event.target.value)}
        />
        <input
          type="text"
          defaultValue={maxValue}
          placeholder="maximus value"
          name="max"
          onChange={(event) => setMaximumValue(event.target.value)}
        />
        <input
          type="text"
          defaultValue={value}
          placeholder="value"
          name="value"
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </div>
  );
};

export default App;
