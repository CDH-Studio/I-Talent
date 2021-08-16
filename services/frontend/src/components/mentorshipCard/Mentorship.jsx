import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import ProfileCards from "../profileCards/ProfileCards";
import MentorshipView from "./MentorshipView";

const Mentorship = ({ data, editableCardBool }) => {
  const intl = useIntl();

  const formatData = (list) => {
    const categorizedList = {};

    if (list) {
      list.forEach((listElement) => {
        const key = listElement.categoryId;

        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.name];
        } else {
          categorizedList[key].push(listElement.name);
        }
      });
    }

    return categorizedList;
  };

  const setUpCategories = (list) => {
    const categorizedList = {};
    const categoriesTemp = {};
    const categories = [];

    let k = 0;

    if (list) {
      list.forEach((listElement) => {
        const key = listElement.categoryId;
        if (categorizedList[key] == null) {
          categorizedList[key] = [listElement.name];
          if (categoriesTemp[k] == null) {
            categoriesTemp[k] = [listElement.category];
            k += 1;
          }
        } else {
          categorizedList[key].push(listElement.name);
        }
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, val] of Object.values(categoriesTemp).entries()) {
      categories.push({ index, val });
    }

    return categories;
  };

  const setUpMentorshipSkills = () => {
    const mentorshipSkills = [];
    const categorizedSkillsList = formatData(data.mentorshipSkills);

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, val] of Object.values(categorizedSkillsList).entries()) {
      mentorshipSkills.push({ index, val });
    }

    return mentorshipSkills;
  };

  return (
    <ProfileCards
      cardName="mentorshipSkills"
      data={data}
      editableCardBool={editableCardBool}
      editUrl="/profile/edit/talent?tab=mentorship"
      id="card-profile-mentorship-skills"
      lastUpdated={data.mentorshipSkillsUpdatedAt}
      titleString={intl.formatMessage({ id: "mentorship.skills" })}
      visibility={data.visibleCards.mentorshipSkills}
    >
      <MentorshipView
        mentoring={setUpMentorshipSkills()}
        mentoringCategories={setUpCategories(data.mentorshipSkills)}
      />
    </ProfileCards>
  );
};

Mentorship.propTypes = {
  data: ProfileInfoPropType,
  editableCardBool: PropTypes.bool,
};

Mentorship.defaultProps = {
  data: null,
  editableCardBool: false,
};

export default Mentorship;
