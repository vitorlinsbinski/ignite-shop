import { styled } from "../../styles";

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
  borderRadius: 8,
  //padding: "0.25rem",
  cursor: "pointer",
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  maxWidth: 540,

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "1.6rem 2rem",

    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0,0,0,0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all .2s ease-in-out",

    ".left": {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",

      strong: {
        fontSize: "$lg",
        color: "$gray100",
      },

      span: {
        fontSize: "$xl",
        fontWeight: "bold",
        color: "$green300",
      },
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },

  "@media (max-width: 420px)": {
    img: {
      objectFit: "contain",
      width: "28rem",
    },

    footer: {
      padding: "1.6rem 1.1rem",
      ".left": {
        width: "100%",
        maxWidth: "70%",

        strong: {
          fontSize: "1rem",
        },

        span: {
          fontSize: "1.2rem",
        },
      },
    },
  },
});

export const AddToBagButton = styled("button", {
  width: "3.5rem",
  height: "3.5rem",
  borderRadius: 8,
  backgroundColor: "$green500",

  border: 0,
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color .3s",

  svg: {
    color: "$gray100",
  },

  "&:hover": {
    backgroundColor: "$green300",
  },
});
