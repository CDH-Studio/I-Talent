import React from "react";
import LandingLayoutView from "./LandingLayoutView";
import backgroundOptionOne from "../../../assets/landing-1.svg";
import backgroundOptionTwo from "../../../assets/landing-2.svg";
import backgroundOptionThree from "../../../assets/landing-3.svg";

/**
 *  LandingLayout(props)
 *
 *  this is the controller for LandingLayoutView
 */
const LandingLayout = () => {
  /**
   * Random Picture Select
   *
   * select a random picture for landing page
   */
  const randomPictureSelect = () => {
    const imageOptions = [
      backgroundOptionOne,
      backgroundOptionTwo,
      backgroundOptionThree,
    ];
    const randomIndex = Math.floor(Math.random() * imageOptions.length);
    return imageOptions[randomIndex];
  };

  return <LandingLayoutView backgroundImage={randomPictureSelect()} />;
};

export default LandingLayout;
