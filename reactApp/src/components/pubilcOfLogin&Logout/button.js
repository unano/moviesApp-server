import styled from 'styled-components';

const Button = styled.button`
  padding:5px;
  padding-left:20px;
  padding-right:20px;
  font-size:18px;
  background-color:white;
  color:${props =>props.theme.viking};
  border-radius:3px;
  border: 1px solid ${props =>props.theme.viking};
  &:hover{
    color:white;
    background-color:${props =>props.theme.viking};
`;

export default Button;