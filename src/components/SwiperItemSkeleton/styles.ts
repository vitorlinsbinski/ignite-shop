import { keyframes, styled } from "../../styles";

const skeletonAnimation = keyframes({
  "0%": {
    backgroundPosition: "-500px 0",
  },
  "100%": {
    backgroundPosition: "calc(500px + 100%) 0",
  },
});

export const ProductLoadingContainer = styled("div", {
  width: "100%",
  maxWidth: 540,
  height: 656,
  borderRadius: 8,

  cursor: "pointer",
  position: "relative",

  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  overflow: "hidden",

  gap: "1rem",

  "@media (max-width: 420px)": {
    height: "auto",
  },
});

export const ImageLoadingContainer = styled("div", {
  width: "100%",
  height: 600,
  borderRadius: 8,
  backgroundColor: "$gray800",
  backgroundImage: "linear-gradient(90deg, #202024, #29292e, #202024)",
  backgroundSize: "400px 100%",
  backgroundRepeat: "no-repeat",

  animation: `${skeletonAnimation} 1300ms ease-in-out infinite`,

  "@media (max-width: 420px)": {
    height: "100%",
  },
});

export const TextLoadingContainer = styled("div", {
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  ".left, .right": {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "$gray800",
    backgroundImage: "linear-gradient(90deg, #202024, #29292e, #202024)",
    backgroundSize: "400px 100%",
    backgroundRepeat: "no-repeat",
    animation: `${skeletonAnimation} 1300ms ease-in-out infinite`,
  },

  ".left": {
    maxWidth: "50%",
  },

  ".right": {
    maxWidth: "40%",
  },
});
