import React, { useState, ChangeEvent } from "react";
import { AiOutlineEye } from "react-icons/ai";

interface FormInputProps {
    inputCount: number;
    inputType: string[];
    placeholder: string[];
    onChange: (inputValues: string[]) => void;
    width: string
    mdWidth?: string
    lgWidth?: string
    xlWidth?: string
    xxlWidth?: string
}

function FormInput({ inputCount, inputType, placeholder, onChange, width, mdWidth, lgWidth, xlWidth, xxlWidth }: FormInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const [inputValues, setInputValues] = useState<string[]>(
        new Array(inputCount).fill("")
    );

    
    const handleChange = (index: number, value: string) => {
        setInputValues((prevState) => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    onChange(inputValues);

    return (
        <div>
            {Array.from({ length: inputCount }, (_, i) => (
                <div key={`input-${i}`} className="relative" >
                    <input
                        key={i}
                        type={showPassword && inputType[i] === "password" ? "text" : inputType[i]}
                        placeholder={placeholder[i]}
                        className={`w-${width} md:w-${mdWidth} lg:w-${lgWidth} xl:w-${xlWidth} 2xl:w-${xxlWidth} px-2 py-1 border mt-5 border-primary rounded-md focus:outline-none focus:ring focus:ring-white`}
                        value={inputValues[i]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange(i, e.target.value)
                        }
                    />
                    {
                        inputType[i] === "password" && (
                            <AiOutlineEye
                                className="absolute right-2 top-7  cursor-pointer"
                                onClick={handleTogglePassword}
                            />
                        )
                    }
                </div>
            ))}
        </div>
    );
}

export default FormInput;
