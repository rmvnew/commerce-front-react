import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

interface BasicDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const BasicDatePicker: React.FC<BasicDatePickerProps> = ({ label, value, onChange }) => {
  const handleChange = (date: any) => {
    onChange(date ? date.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          label={label}
          value={value ? dayjs(value) : null}
          onChange={handleChange}
          format="DD/MM/YYYY"
          sx={{
            width:'100%',
            height:'100%',
            position:'absolute',
            top:'0',
            
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
