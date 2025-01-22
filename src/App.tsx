import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "./components/carousel";
import CircleComponent from "./components/circle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  margin: 0 60px;
  position: relative;
  width: auto;
  height: 100%;

  @media (max-width: 1024px) {
    border-right: none;
    border-left: none;
    margin: 0;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 35%;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: rgba(66, 86, 122, 0.1);
    transform-origin: center;
    transform: translate(-50%, -50%);
    @media (max-width: 1024px) {
      display: none;
    }
  }

  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
    @media (max-width: 1024px) {
      display: none;
    }
  }

  &::after {
    transform: translate(-50%, -50%) rotate(180deg);
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const Gradient = styled.div`
  position: absolute;
  left: 0;
  top: 90px;
  width: 10px;
  height: 120px;
  background: linear-gradient(
    180deg,
    rgba(56, 119, 238, 1) 0%,
    rgba(239, 93, 168, 1) 100%
  );

  @media (max-width: 1024px) {
    background: transparent;
    width: 10px;
    height: 0;
  }
`;

const Title = styled.p`
  margin-left: 70px;
  top: 170px;
  font-family: "PT Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 120%;
  color: #42567a;

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Container>
      <Gradient>
        <Title>Исторические даты</Title>
      </Gradient>
      <CircleComponent
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
      <Carousel setActiveIndex={setActiveIndex} activeIndex={activeIndex} />
    </Container>
  );
};

export default App;
