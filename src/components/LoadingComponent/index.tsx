import { LoadingContainer } from "./styles";

export function LoadingComponent() {
  return (
    <LoadingContainer>
      <div className="overlay"></div>
      <div className="circle"></div>
    </LoadingContainer>
  );
}
