
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const InputTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      borderColor: ${props => props.error ? 'red' : ''};
    }
    &:hover fieldset {
      borderColor: ${props => props.error ? 'red' : ''};
    }
    &.Mui-focused fieldset {
      borderColor: ${props => props.error ? 'red' : ''};
    }
  }
  & .Mui-focused {
    color: ${props => props.error ? 'red' : ''};
  }
`;



export const ErrorLabel = styled.label`
  color: red;
  font-weight: 300;
  font-size: 0.7rem;
`


// sx={{
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//       },
//       '&:hover fieldset': {
//         borderColor: 'red',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'red',
//       },
//     },
//   }}