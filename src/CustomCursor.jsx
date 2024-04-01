import React from 'react';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useThree } from '@react-three/fiber'


const CustomCursor = () => {
    const cursorSize = 15;

    const { size } = useThree()
    console.log(size.width, size.height);

    const mouse = {
      x: useMotionValue(0),
      y: useMotionValue(0)
    }
  
    const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}
    const smoothMouse = {
      x: useSpring(mouse.x, smoothOptions),
      y: useSpring(mouse.y, smoothOptions)
    }
  
    const manageMouseMove = e => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  
  
    useEffect( () => {
      window.addEventListener("mousemove", manageMouseMove);
      return () => {
        window.removeEventListener("mousemove", manageMouseMove)
      }
    }, [])

  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    />
  );
};

export default CustomCursor;