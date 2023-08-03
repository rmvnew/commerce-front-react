



export const inputMoneyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setSystem: React.Dispatch<React.SetStateAction<number>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const currentEvent = event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  
    let { value } = event.target;
  
    setInput(value);
  
    value = value.replace(',', '.');
  
    const numberValue = value.includes('.') ? parseFloat(value) : parseInt(value);
  
    if (!isNaN(numberValue)) {
      setSystem(numberValue);
    }
  };
  