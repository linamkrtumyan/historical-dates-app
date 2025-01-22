import React, { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { EVENTS } from "../../mocks/dates";

interface RotatableElement extends HTMLElement {
  angle?: number;
}

export const Circle = styled.div`
  position: relative;
  width: 530px;
  height: 530px;
  border-radius: 50%;
  display: flex;
  border: 1px solid rgba(66, 86, 122, 0.2);
  z-index: 2;
  margin-top: 50px;
  @media (max-width: 1024px) {
    height: 200px;
    width: 100%;
    border: none;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 80px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);

  :first-child {
    color: #ef5da8;
  }

  :last-child {
    color: #3877ee;
  }
  @media (max-width: 1024px) {
    gap: 10px;
  }
`;

export const Date = styled.p`
  font-size: 200px;

  @media (max-width: 1024px) {
    font-size: 56px;
  }
`;

export const Dot = styled.div<{ isActive: boolean; angle: number }>`
  position: absolute;
  width: ${({ isActive }) => (isActive ? "50px" : "6px")};
  height: ${({ isActive }) => (isActive ? "50px" : "6px")};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${({ isActive }) => (isActive ? "#F4F5F9" : "#42567A")};
  border: ${({ isActive }) =>
    isActive ? "1px solid rgba(66, 86, 122, 0.2)" : "none"};
  transform: translate(-50%, -50%)
    scale(${({ isActive }) => (isActive ? 1.5 : 1)})
    rotate(${({ isActive, angle }) => (isActive ? angle + 60 : 0)}deg);

  transition: transform 0.3s, background-color 0.3s, color 0.3s, width 0.3s,
    height 0.3s, border 0.3s;

  top: ${({ angle }) => 50 + 45 * Math.sin((angle * Math.PI) / 180)}%;
  left: ${({ angle }) => 50 + 45 * Math.cos((angle * Math.PI) / 180)}%;

  &:hover {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border: 1px solid rgba(66, 86, 122, 0.2);
    color: #42567a;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Wrapper = styled.div``;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  left: 60px;
  position: absolute;
  gap: 5px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Arrow = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.502);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s, color 0.3s, width 0.3s,
    height 0.3s, border 0.3s;

  &:hover {
    background-color: #fff;
    transform: scale(1.2);
    border: 1px solid rgba(66, 86, 122, 0.2);
    color: #42567a;
  }
`;

interface CircleComponentProps {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
}

const CircleComponent: FC<CircleComponentProps> = ({
  setActiveIndex,
  activeIndex,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isActiveIndexValid = activeIndex >= 0 && activeIndex < EVENTS.length;

  useEffect(() => {
    handleNext();
  }, []);

  const handleDotClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    if (!isNaN(index)) {
      setActiveIndex(index);
      rotateCircle(index);
    }
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % EVENTS.length;
      rotateCircle(nextIndex);
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const prevIndexNew = (prevIndex - 1 + EVENTS.length) % EVENTS.length;
      rotateCircle(prevIndexNew);
      return prevIndexNew;
    });
  };

  const rotateCircle = (index: number) => {
    console.log(index, "index");
    const circle = document.querySelector(".circle") as RotatableElement;
    if (!circle) return;

    circle.angle = circle.angle || 0;
    const dotAngle = index * 72;
    const targetAngle = 30;
    const newRotation = targetAngle - dotAngle;

    console.log(newRotation, "newRotation");

    gsap.to(circle, {
      rotation: newRotation - 90,
      duration: 1,
      ease: "power3.out",
    });
  };

  const dateContainerRef = useRef<HTMLDivElement>(null);
  const firstYearRef = useRef<HTMLDivElement>(null);
  const lastYearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dateContainerRef.current) {
      gsap.fromTo(
        dateContainerRef.current,
        { opacity: 0, x: -30, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          repeat: 0,
        }
      );
    }

    if (firstYearRef.current && lastYearRef.current) {
      const startYear = EVENTS[activeIndex][0].year;
      const endYear = EVENTS[activeIndex][EVENTS[activeIndex].length - 1].year;

      gsap.fromTo(
        firstYearRef.current,
        { innerText: startYear - 5 },
        {
          innerText: startYear,
          duration: 1,
          snap: { innerText: 1 },
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        lastYearRef.current,
        { innerText: endYear - 5 },
        {
          innerText: endYear,
          duration: 1,
          snap: { innerText: 1 },
          ease: "power1.out",
        }
      );
    }
  }, [activeIndex]);

  return (
    <Wrapper>
      <DateContainer ref={dateContainerRef}>
        {isActiveIndexValid && (
          <>
            <Date ref={firstYearRef}>{EVENTS[activeIndex][0].year}</Date>
            <Date ref={lastYearRef}>
              {EVENTS[activeIndex][EVENTS[activeIndex].length - 1].year}
            </Date>
          </>
        )}
      </DateContainer>

      <Circle className="circle">
        {Array.from({ length: EVENTS.length }, (_, index) => {
          const angle = index * 72;
          return (
            <Dot
              key={index}
              className="dot"
              isActive={activeIndex === index}
              angle={angle}
              onClick={handleDotClick}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-index={index}
            >
              <p>
                {activeIndex === index || hoveredIndex === index
                  ? index + 1
                  : ""}
              </p>
            </Dot>
          );
        })}
      </Circle>

      <ActionContainer>
        <Pagination>
          0{activeIndex + 1}/0{EVENTS.length}
        </Pagination>
        <ArrowContainer>
          <Arrow onClick={handlePrev}>
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          </Arrow>

          <Arrow onClick={handleNext}>
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
                stroke="#42567A"
                strokeWidth="2"
              />
            </svg>
          </Arrow>
        </ArrowContainer>
      </ActionContainer>
    </Wrapper>
  );
};

export default CircleComponent;
