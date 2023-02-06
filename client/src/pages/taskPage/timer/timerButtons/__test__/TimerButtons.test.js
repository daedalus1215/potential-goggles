import React from "react";
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TimerButtons from "../TimerButtons";

describe('src/pages/tasks/TaskForm/timer/timerButtons/__test__/TimerButtons.test.js', () => {
    describe('TimerButtons', () => {
        jest.useFakeTimers();

        describe('resume button', () => {
            it('should render resume button, when isActive is false and time is greater than 0', () => {
                // Arrange
                const time = 100;
                const isActive = false;
                const setIsActive = jest.fn();

                // Act
                const target = render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);

                // Assert
                expect(target.container.querySelector(".timerStop")).toBeFalsy();
                expect(target.container.querySelector(".timerResume")).toBeTruthy();
                expect(target.container.querySelector(".timerStart")).toBeFalsy();
            });

            it('should fire isActive when clicked', () => {
                // Arrange
                const time = 100;
                const isActive = false;
                const setIsActive = jest.fn();

                // Act
                render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);
                fireEvent.click(screen.queryByTestId("resume"));

                // Assert
                expect(setTimeout).toBeCalled();
            });
        });

        describe('stopButton', () => {
            it('should render stop button, when isActive is true and time is more than 0', () => {
                // Arrange
                const time = 100;
                const isActive = true;
                const setIsActive = jest.fn();

                // Act
                const target = render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);

                // Assert
                expect(target.container.querySelector(".timerStop")).toBeTruthy();
                expect(target.container.querySelector(".timerResume")).toBeFalsy();
                expect(target.container.querySelector(".timerStart")).toBeFalsy();
            });

            it('should fire isActive when clicked', () => {
                // Arrange
                const time = 100;
                const isActive = true;
                const setIsActive = jest.fn();

                // Act
                render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);
                fireEvent.click(screen.queryByTestId("stop"));

                // Assert
                expect(setTimeout).toBeCalled();
            });
        });
        
        describe('startButton', () => {
            it('should render play button, when isActive is false and time is 0', () => {
                // Arrange
                const time = 0;
                const isActive = false;
                const setIsActive = jest.fn();
    
                // Act
                const target = render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);
    
                // Assert
                expect(target.container.querySelector(".timerStop")).toBeFalsy();
                expect(target.container.querySelector(".timerResume")).toBeFalsy();
                expect(target.container.querySelector(".timerStart")).toBeTruthy();
            });

            it('should fire isActive when clicked', () => {
                // Arrange
                const time = 0;
                const isActive = false;
                const setIsActive = jest.fn();

                // Act
                render(<TimerButtons time={time} isActive={isActive} setIsActive={setIsActive} />);
                fireEvent.click(screen.queryByTestId("start"));

                // Assert
                expect(setTimeout).toBeCalled();
            });
        });
    });
});
