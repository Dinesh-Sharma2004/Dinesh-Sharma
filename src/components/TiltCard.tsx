import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect touch device or reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchDevice(hasTouch || prefersReducedMotion);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
    },
    [isTouchDevice, maxTilt, scale]
  );

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tilt-perspective transition-all duration-200 ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out'
          : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
      }}
    >
      {children}
    </div>
  );
};
