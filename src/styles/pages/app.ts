import { keyframes, styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",

  "@media (max-width: 720px)": {
    justifyContent: "start",
  },
});

const LoadingAnimation = keyframes({
  "0%": {
    transform: "scale(1) rotate(0)",
  },
  "50%": {
    transform: "scale(0.8) rotate(180deg)",
  },
  "100%": {
    transform: "scale(1) rotate(360deg)",
  },
});

const Rotating = keyframes({
  from: {
    transform: "translate(-50%, -50%) rotate(0deg)",
  },
  to: {
    transform: "translate(-50%, -50%) rotate(360deg)",
  },
});

export const LoadingComponent = styled("div", {
  width: "100vw",
  height: "100vh",

  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2022,
  top: 0,
  left: 0,

  ".overlay": {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: 0,
    top: 0,
    left: 0,
    backgroundColor: "$gray900",
    opacity: 0.9,
  },

  ".circle": {
    width: "5rem",
    height: "5rem",
    backgroundColor: "$green300",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    animation: `${LoadingAnimation} 1s ease-in-out infinite`,
    position: "relative",
    borderRadius: 8,

    "&::before": {
      content: '""',
      width: "15rem",
      height: "15rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderTop: "5px solid $blue", // Assuming you have a color variable named "blue"
      borderRadius: "50%",
      zIndex: -1,
      animation: `${Rotating} 1s ease-in-out infinite`,
    },
  },
});
