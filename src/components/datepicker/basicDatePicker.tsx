import React from 'react';

import BasicDatePicker from './datepicker';
import { CardDatePicker } from './datepicker.styled';

interface GenericDatePickerProps {
    label: string;
    value: Date | null;
    setDate: (date: Date | null) => void;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({ label, value, setDate }) => {
    const handleDateChange = (date: Date | null) => {
        setDate(date);
    };

    return (
        <CardDatePicker>
            <BasicDatePicker
                label={label}
                value={value}
                onChange={handleDateChange}
            />
        </CardDatePicker>
    );
}

export default GenericDatePicker;
