import random from "lodash/random";
import LandingLayoutView from "./LandingLayoutView";
import backgroundOptionOne from "../../../assets/landing-1.svg";
import backgroundOptionTwo from "../../../assets/landing-2.svg";
import backgroundOptionThree from "../../../assets/landing-3.svg";
import backgroundOptionFour from "../../../assets/landing-4.svg";
import backgroundOptionFive from "../../../assets/landing-5.svg";
import backgroundOptionSix from "../../../assets/landing-6.svg";
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
      backgroundOptionFour,
      backgroundOptionFive,
      backgroundOptionSix,
    ];
    const randomIndex = random(imageOptions.length - 1);
    return imageOptions[randomIndex];
  };

  return <LandingLayoutView backgroundImage={randomPictureSelect()} />;
};

export default LandingLayout;
