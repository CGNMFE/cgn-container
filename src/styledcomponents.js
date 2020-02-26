import styled, { keyframes } from "styled-components";

//Animations

const fadein = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const RouteWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
`;

export const AuthButton = styled.button`
  width: 100%;
  border-radius: 25px;
  background-color: ${props => props.backgroundColor || "#1e76bd"};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  border-radius: 25px;
  background-color: #f33d3d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
`;

export const CenterRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Auth

export const AuthWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled.div`
  width: 40vw;
  height: 50vh;
  animation: ${fadein} 1s;
`;

export const AuthForm = styled.form`
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
`;

export const AuthBanner = styled.div`
  width: 50vw;
  height: 100vh;
  box-shadow: 6px 0px 8px -6px black;
`;

export const BannerImage = styled.img`
  width: 50vw;
  height: 100%;
`;
