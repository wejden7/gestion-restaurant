import { Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./Input.style.scss";
export const InputSelect = ({ control, name, data, errors }) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ ref, field }) => (
          <Select
            inputRef={ref}
            value={field.value}
            className="input-select"
            onChange={(val) => {
              field.onChange(val);
            }}
          >
            {data.map((item, index) => (
              <MenuItem key={index} value={item._id || item.value}>
                {item.label || item.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <p className="select-input-error">{errors[name]?.message}</p>
    </div>
  );
};
