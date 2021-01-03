import styled from 'styled-components';

const Warp = styled.div`
    width:300px;
    height:300px;
    margin: 0 auto;
    margin-top:40px;
    text-align: center;
    border-radius: 0.2px;
    border: 2px ${props => props.theme.viking};
    box-shadow: 0 0 0 2px darkturquoise,0 8px 8px rgba(18,18,18,0.1);
    `;
export default Warp;