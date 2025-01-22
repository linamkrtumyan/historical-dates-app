import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { EVENTS } from "../../mocks/dates";
import "swiper/css";
import "swiper/css/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  margin-top: 140px;
`;

const StyledSwiperContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;

  .mySwiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    padding: 0 60px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(56, 119, 238, 0.1);
    color: #007bff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    &:hover {
      color: #0056b3;
    }

    &::after {
      font-size: 10px;
    }

    &:disabled {
      display: none;
    }
  }

  .swiper-button-next {
    right: 20px !important;
    top: 100px;
  }

  .swiper-button-prev {
    left: 20px !important;
    top: 100px;
  }

  .swiper-button-disabled {
    display: none;
  }
`;

const Title = styled.p`
  font-family: "Bebas Neue";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 120%;
  text-transform: uppercase;
  color: #3877ee;
`;

const Content = styled.p`
  font-family: "PT Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  margin-top: 15px;
  color: #42567a;
`;

interface CircleComponentProps {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

const Carousel: React.FC<CircleComponentProps> = ({ activeIndex }) => {
  return (
    <Container>
      <StyledSwiperContainer>
        <Swiper
          navigation={true}
          slidesPerView={2}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {EVENTS[activeIndex].map((event) => (
            <SwiperSlide key={event.id}>
              <Title>{event.year}</Title>
              <Content>{event.event}</Content>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiperContainer>
    </Container>
  );
};

export default Carousel;
