import React, { CSSProperties, useState } from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  ResponsiveValue,
  FlexProps,
  Flex,
  Textarea
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type AppInputProps = {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  textInputStyle?: CSSProperties;
  placeholder?: string;
  isTextArea?: boolean;
  isPhone?: boolean;
  control?: any;
  placeholderStyle?: CSSProperties;
  register?: any;
  variant?: ResponsiveValue<
    (string & {}) | 'outline' | 'filled' | 'flushed' | 'unstyled'
  >;
} & FlexProps;

export const generalStyle = {
  height: '3.1rem',
  backgroundColor: '#FCFCFC',
  border: '0.4px solid rgba(15, 99, 255, 0.08)',
  borderRadius: '4px',
  color: '#000',
  fontSize: '1rem',
  fontWeight: '500'
};

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      errorMessage,
      isRequired,
      type,
      placeholder,
      variant,
      control,
      defaultValue,
      id,
      h,
      textInputStyle,
      w,
      placeholderStyle,
      onChange,
      isPhone,
      isTextArea,
      register,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => setShow(!show);

    return (
      <FormControl isRequired={isRequired && isRequired}>
        {label && type !== "password" ? (
          <FormLabel
            htmlFor={id}
            fontSize={"1.2rem"}
            fontWeight={"bold"}
            color="typography.gray"
          >
            {label}
          </FormLabel>
        ) : label && type === "password" ? (
          <FormLabel
            htmlFor={id}
            fontSize={"1.2rem"}
            fontWeight={"bold"}
            color="typography.gray"
          >
            <Flex justifyContent={"space-between"}>
              <div>{label}</div>
              {show ? (
                <div onClick={handleClick}>Hide</div>
              ) : (
                <div onClick={handleClick}>Show</div>
              )}
            </Flex>
          </FormLabel>
        ) : isPhone ? (
          <Controller
            name={id ? id : ""}
            control={control}
            render={({
              field: { onChange: onPhoneChange, value: phoneValue },
            }) => (
              <PhoneInput
                id={id}
                onChange={onPhoneChange}
                value={phoneValue}
                defaultValue={defaultValue}
                defaultCountry="NG"
                style={{ ...generalStyle }}
              />
            )}
          />
        ) : isTextArea ? (
          <Textarea
            style={{
              ...generalStyle,
              height: `${h ? h : generalStyle.height}`,
              width: `${w && w}`,
              ...textInputStyle,
            }}
            id={id}
            {...register}
            placeholder={placeholder}
            defaultValue={defaultValue}
            _placeholder={placeholderStyle}
            onChange={onChange}
          />
        ) : null}
        <Input
          fontSize={"1rem"}
          height={"3.1rem"}
          fontWeight="500"
          _placeholder={{ fontSize: "1rem", color: "grey" }}
          variant={variant}
          placeholder={placeholder}
          type={type !== "password" ? "text" : show ? "text" : "password"}
          {...rest}
          ref={ref}
          {...register}
        />
        {errorMessage && (
          <FormHelperText fontSize="0.8rem" color="red">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppInput.displayName = 'AppInput';
export default AppInput;
