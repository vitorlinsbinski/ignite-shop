import {
  ImageLoadingContainer,
  ProductLoadingContainer,
  TextLoadingContainer,
} from "./styles";

export function SwiperSkeleton() {
  return (
    <ProductLoadingContainer className="keen-slider__slide">
      <ImageLoadingContainer></ImageLoadingContainer>

      <TextLoadingContainer>
        <div className="left"></div>

        <div className="right"></div>
      </TextLoadingContainer>
    </ProductLoadingContainer>
  );
}
