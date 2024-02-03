import * as React from "react";
import { Switch } from "@radix-ui/react-switch";

type ButtonProps = {
  handleClick: (checked: boolean) => void; 
};

export default function ToggleSwitch(props: { Toggle: ButtonProps }) {
  const [checked, setChecked] = React.useState(false);

  function handleChange(checked: boolean) {
    setChecked(checked);
    if (props.Toggle.handleClick) {
      props.Toggle.handleClick(checked);
    }
  }

  return (
    <>
      <span className="sr-only">Toggle</span>

      <Switch
        checked={checked}
        onCheckedChange={(isChecked) => handleChange(isChecked)} // Pass the checked state
        className={`${
          checked ? "bg-[#349997]" : "bg-gray-300"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
      >
        <span
          className={`${
            checked ? "translate-x-5" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
    </>
  );
}
