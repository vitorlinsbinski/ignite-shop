import { keyframes } from "@stitches/react";
import { styled } from "..";

export const backgroundChange = keyframes({
  "0%": {
    background: "#202024", // Cinza escuro
  },
  "50%": {
    background: "#3c3c3c", // Cinza médio
  },
  "100%": {
    background: "#515151", // Cinza claro
  },
});

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: 656,

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: "1.6",
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    transition: "background-color .2s",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});

export const LoadingContainer = styled("main", {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  maxWidth: 1180,
  width: "100%",
  margin: "0 auto",
});

export const ImageLoadingContainer = styled("div", {
  width: "50%",
  background: "#202024",
  borderRadius: 8,
  padding: "0.25rem",
  animation: `${backgroundChange} 1s infinite`,
  height: 656,
});

export const ProductLoadingDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  width: "40%",

  ".title, .price, .description, .button": {
    width: "100%",
    height: "2rem",
    background: "#202024",
    animation: `${backgroundChange} 1s infinite`,

    borderRadius: 8,
  },

  ".button": {
    marginTop: "auto",
  },
});
