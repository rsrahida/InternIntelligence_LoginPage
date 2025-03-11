import React, { useEffect, useRef } from "react";
import "./StarBackground.css";

const StarBackground = () => {
  const starsContainerRef = useRef(null);
  const starsArr = [];
  const shapes = ["★", "☆"];

  useEffect(() => {
    const stars = starsContainerRef.current;
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const newStar = () => {
      let id = starsArr.length,
        x = rnd(0, stars.offsetWidth),
        size = rnd(2, 5) / 2,
        color = rnd(30, 60) / 100,
        speed = rnd(0.5, 1.5),
        y = -10 * size;

      starsArr.push({ id, x, y, size, color, speed });
      const starElement = document.createElement("div");
      starElement.id = `star${id}`;
      starElement.className = "star";
      starElement.innerHTML = shapes[rnd(0, shapes.length - 1)];
      stars.appendChild(starElement);
    };

    const move = () => {
      for (let i = 0; i < starsArr.length; i++) {
        const star = starsArr[i];
        if (star) {
          const elem = document.getElementById(`star${i}`);
          star.y += star.speed;
          star.x += Math.sin(star.y / 10);

          elem.style.left = `${star.x}px`;
          elem.style.top = `${star.y}px`;
          elem.style.fontSize = `${star.size}em`;
          elem.style.opacity = star.color;

          if (star.y > stars.offsetHeight) {
            elem.remove();
            delete starsArr[i];
          }
        }
      }
    };

    const intervalNewStar = setInterval(newStar, 1000);
    const intervalMoveStars = setInterval(move, 40);
    return () => {
      clearInterval(intervalNewStar);
      clearInterval(intervalMoveStars);
    };
  }, []);

  return (
    <div
      ref={starsContainerRef}
      className="stars-container"
      style={{
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    />
  );
};

export default StarBackground;
