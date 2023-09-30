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
  position: "relative",

  svg: {
    color: "$gray300",
  },
});

export const ProductsCounter = styled("div", {
  position: "absolute",
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: "$green300",

  top: -7,
  right: -7,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  outline: "4px solid $gray900",

  span: {
    color: "$gray100",
    fontSize: "0.875rem",
    fontWeight: "700",
  },
});
