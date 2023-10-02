import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  //gap: "3rem",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  width: "100%",
  marginLeft: "auto",
  minHeight: 656,
  borderRadius: 8,

  "@media (max-width: 420px)": {
    minHeight: 500,
    maxHeight: 500,
  },

  "@media (max-width: 720px)": {
    paddingLeft: "1rem",
    marginTop: "2rem",
  },
});
