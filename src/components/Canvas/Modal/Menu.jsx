import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import Portal from "./Portal";
import useRectHook from "./hooks/useRectHook";
import classnames from "classnames";

// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40
const scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

const Menu = ({ targetRef, children, className }) => {
  const [size, setSize] = useState({
    left: 0,
    repositionY: 0,
    repositionX: 0
  });

  const {
    top: targetTop,
    bottom: targetBottom,
    left: targetLeft,
    right: targetRight,
    width: targetWidth
  } = useRectHook(targetRef);

  const contentRef = useRef(null);

  const { width: contentWidth, height: contentHeight } = useRectHook(
    contentRef
  );

  const handleSize = useCallback(() => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let repositionY = 0;
    let repositionX = targetLeft;

    // top
    // console.log(targetTop, "targetTop");
    // console.log(contentHeight, "contentHeight");
    // console.log(windowHeight, "windowHeight");
    if (targetTop + contentHeight > windowHeight) {
      // console.log("top");
      repositionY = scrollTop + targetTop - contentHeight;
    }

    // bottom
    if (targetTop + contentHeight < windowHeight) {
      repositionY = scrollTop + targetBottom;
    }

    let left = repositionX - contentWidth / 2 + targetWidth / 2;

    if (left < 0) {
      left += left * -1 + targetLeft;
    }

    if (targetLeft + contentWidth > windowWidth) {
      left = targetRight - contentWidth;
    }

    setSize({
      left,
      repositionY,
      repositionX
    });
  }, [
    contentWidth,
    targetWidth,
    targetBottom,
    targetLeft,
    contentHeight,
    targetTop,
    targetRight
  ]);

  const preventDefault = useCallback(e => {
    let event = e || window.event;
    if (event) {
      event.preventDefault();
    }
  }, []);

  const preventKeys = useCallback(e => {
    let event = e || window.event;
    if (event && scrollEventKeys.includes(event.keyCode)) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("wheel", preventDefault, { passive: false });
    document.addEventListener("keydown", preventKeys, { passive: false });
    // document.body.style.overflow = "hidden";

    if (contentRef) {
      handleSize();
    }

    return () => {
      document.removeEventListener("scroll", preventDefault, {
        passive: false
      });
      document.removeEventListener("touchmove", preventDefault, {
        passive: false
      });
      document.removeEventListener("wheel", preventDefault, { passive: false });
      document.removeEventListener("keydown", preventKeys, { passive: false });
      // document.body.style.overflow = "auto";
    };
  }, [handleSize, contentRef, preventDefault, preventKeys]);

  return (
    <Portal>
      <div
        ref={contentRef}
        style={{ left: size.left, top: size.repositionY }}
        className={classnames(
          "absolute bg-gray-400 p-2 h-auto w-auto",
          className
        )}
      >
        {children}
      </div>
    </Portal>
  );
};

Menu.propTypes = {
  targetRef: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

Menu.defaultProps = {
  className: "",
  show: false
};

Menu.displayName = `Menu`;

export default Menu;
