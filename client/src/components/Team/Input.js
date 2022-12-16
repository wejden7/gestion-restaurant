
import { Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
export const InputText = ({ register, name, errors, icon }) => {
    return (
      <div className="text-input">
        <label className="text-input-label" icon={icon} htmlFor="">
          <input
            {...register(name)}
            className="input-text"
            type="text"
            placeholder="Name"
          />
        </label>
        <p className="text-input-error">{errors}</p>
      </div>
    );
  };
export   const InputSelect = ({ control, name, data, errors }) => {
    return (
      <div className="select-input-group">
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
              <MenuItem className="item" value="-1">
                Select post
              </MenuItem>
              {data.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
  
        <p className="select-input-error">{errors}</p>
      </div>
    );
  };