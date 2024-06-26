'use client'
import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, useState, useEffect } from "react";

type Props = {
  options: { label: string }[];
  onChange: (newValue: { label: string }) => void;
  value: string;
};
export default function SelectBoxNew({ options, onChange, value }: Props) {
  const [selected, setSelected] = useState(options[2] || options[1]);
  return (
    <div className="select-box">
      <Listbox value={selected} onChange={(newValue) => {
        onChange(newValue);
        setSelected(newValue)
      }}>
        <div>
          <Listbox.Button className="select-box">
            <span>{selected.label}</span>
            <span>
              <IconChevronDown aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) => ` ${active ? "active" : ""}`}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={` ${selected ? "selected" : ""}`}>
                        {option.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}