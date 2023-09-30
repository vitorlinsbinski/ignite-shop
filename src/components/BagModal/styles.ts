import { keyframes, styled } from "../../styles/";
import * as Dialog from "@radix-ui/react-dialog";

const RightToLeft = keyframes({
  "0%": {
    transform: "translateX(100%)",
  },
  "100%": {
    transform: "translateX(0)",
  },
});

const LeftToRight = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

const OpacityAnimation = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.3)",

  "&[data-state='open']": {
    animation: `${OpacityAnimation} .5s`,
  },

  "&[data-state='closed']": {
    animation: `${OpacityAnimation} .5s`,
  },
});

export const Content = styled(Dialog.Content, {
  position: "fixed",
  width: "30rem",
  height: "100vh",
  backgroundColor: "$gray800",
  padding: "4.5rem 3rem 3rem 3rem",
  boxShadow: "-4px 0px 30px 0px rgba(0, 0, 0, 0.80)",

  display: "flex",
  flexDirection: "column",

  top: 0,
  right: 0,

  h2: {
    fontSize: "$lg",
    color: "$gray100",
    fontWeight: "700",
    marginBottom: "3.2rem",
  },

  "&[data-state='open']": {
    animation: `${RightToLeft} .4s ease`,
  },

  "&[data-state='closed']": {
    animation: `${LeftToRight} .2s ease`,
  },

  footer: {
    marginTop: "auto",
  },
});

export const ProductsList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  height: "auto",
  overflowY: "scroll",
  marginBottom: "3rem",
  borderRadius: 8,

  "&::-webkit-scrollbar ": {
    width: 3,
  },

  "&::-webkit-scrollbar-track ": {
    backgroundColor: "transparent",
    padding: 2,
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$green300",
    borderRadius: 8,
  },
});

export const Product = styled("div", {
  width: "100%",
  maxWidth: "24rem",
  display: "flex",
  gap: "2rem",
  height: "100%",

  ".imageContainer": {
    width: "6.3rem",
    height: "5.8rem",
    background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: ".1rem 0.25rem",

    img: {
      width: "100%",
      height: "auto",
    },
  },

  ".infoProduct": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    h4: {
      fontSize: "$md",
      color: "$gray300",
      fontWeight: "400",
      marginBottom: "0.125rem",
    },

    strong: {
      fontSize: "$md",
      color: "$gray10000",
      fontWeight: "700",
      marginBottom: "0.5rem",
    },

    button: {
      backgroundColor: "transparent",
      color: "$green300",
      fontSize: "1rem",
      fontWeight: "700",
      border: 0,

      cursor: "pointer",
      transition: "color .3s",

      "&:hover": {
        color: "$green500",
      },
    },
  },
});

export const PurchaseResume = styled("div", {
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ".quantity": {
    marginBottom: "0.18rem",

    "& > span": {
      fontSize: "1rem",
      color: "$gray300",
      lineHeight: "1.6",
    },

    ".total": {
      fontSize: "$md",
      color: "$gray100",
      lineHeight: "1.6",
    },
  },

  ".totalValue": {
    marginBottom: "3.56rem",

    span: {
      fontSize: "$md",
      color: "$gray100",
      fontWeight: "700",
    },

    strong: {
      fontSize: "$xl",
      color: "$gray100",
      fontWeight: "700",
    },
  },
});

export const FinalizePurchaseButton = styled("button", {
  width: "100%",
  height: "3.5rem",
  backgroundColor: "$green500",
  color: "$gray100",
  borderRadius: 8,
  fontSize: "$md",
  border: 0,
  cursor: "pointer",
  transition: "all .3s",

  "&:not(:disabled):hover": {
    backgroundColor: "$green300",
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const CloseButton = styled(Dialog.Close, {
  backgroundColor: "transparent",
  position: "absolute",
  top: 24,
  right: 24,
  border: 0,
  cursor: "pointer",

  svg: {
    color: "$gray300",
    transition: "color .3s",
  },

  "&:hover": {
    svg: {
      color: "$gray100",
    },
  },
});

export const ProductCounter = styled("div", {
  backgroundColor: "#282835",
  width: "5rem",
  height: "2.4rem",
  padding: "0.375rem 0.4375rem",
  marginBottom: ".5rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.625rem",
  borderRadius: 6,

  button: {
    cursor: "pointer",

    "&:disabled": {
      cursor: "not-allowed",
    },

    svg: {
      color: "$green300",
    },
  },
});
