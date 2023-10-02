import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,
  padding: "0 1rem",

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: "1.4",
  },

  a: {
    marginTop: "5rem",
    display: "block",

    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color .2s",

    "&:hover": {
      color: "$green300",
    },
  },

  "@media (max-width: 720px)": {
    h1: {
      fontSize: "1.6rem",
    },

    p: {
      fontSize: "1rem",
      marginTop: "1rem",
    },

    a: {
      marginTop: "2rem",
      fontSize: "1.4rem",
    },
  },
});

export const ProductsContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "-5.5rem",
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "3rem",
  borderRadius: "50%",
  boxShadow: "0px 0px 60px 0px rgba(0, 0, 0, 0.80)",

  "&:not(:last-child)": {
    marginRight: "-2rem",
  },

  img: {
    objectFit: "cover",
  },
});
