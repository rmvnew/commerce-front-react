import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import IMask from 'imask';

interface CNPJTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

const CNPJTextField: React.FC<CNPJTextFieldProps> = ({ value, onChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: '00.000.000/0000-00',
      });

      mask.on('accept', () => onChange(mask.value));

      return () => {
        mask.destroy();
      };
    }
  }, [onChange]);

  // Here we are setting the value of the masked input each render, so the user can type in it.
  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: '00.000.000/0000-00',
      });
      
      mask.value = value;
      
      mask.updateValue();
    }
  }, [value]);

  return (
    <TextField
      {...props}
      inputRef={inputRef}
      InputProps={{
        ...props.InputProps,
        inputProps: {
          ...props.inputProps,
          inputMode: "numeric",
          
        },style:{
         
          width:'100%',
          fontSize: '1.2rem',
          textAlign: 'center',
          textAlignLast:'center'
      }
      }}
    />
  );
};

export default CNPJTextField;
