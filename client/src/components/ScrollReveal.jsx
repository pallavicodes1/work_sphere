import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children, once = true }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const element = ref.current;

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [once]);

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",

        opacity: visible ? 1 : 0,

        transform: visible
          ? "translateY(0px)"
          : "translateY(50px)",

        transition: `
          transform 0.6s ease-out,
          opacity 0.6s ease-out
        `,
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollReveal;