import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import IMask from 'imask';

interface CpfTextFieldMask extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
}

const CPFTextMask: React.FC<CpfTextFieldMask> = ({ value, onChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const mask = IMask(inputRef.current, {
        mask: '000.000.000-00',
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
        mask: '000.000.000-00',
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
          
         
          fontSize: '1.2rem',
          textAlign: 'center',
          textAlignLast:'center'
      }
      }}
    />
  );
};

export default CPFTextMask;
