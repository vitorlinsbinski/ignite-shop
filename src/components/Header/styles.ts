import { styled } from "../../styles";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BagButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  backgroundColor: "$gray800",
  borderRadius: 8,
  cursor: "pointer",
  border: 0,

  svg: {
    color: "$gray300",
  },
});
