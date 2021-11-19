import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Anchor, Col, Row } from "antd";
import PropTypes from "prop-types";

import "./ProfileSidebarContentView.less";

const { Link } = Anchor;

const ProfileSidebarContentView = ({ isOwnersProfile }) => {
  const intl = useIntl();
  return (
    <Row justify="center">
      <Col className="app-sideBarRow" flex={1} offset={1}>
        <Anchor
          aria-label={intl.formatMessage({ id: "edit.profile.side.nav" })}
          offsetTop={80}
        >
          <Link
            href="#card-profile-basic-info"
            title={
              <span className="sideBarText" strong>
                <FormattedMessage id="basic.employee.information" />
              </span>
            }
          >
            <Link
              href="#card-profile-basic-info"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="primary.contact.information" />
                </span>
              }
            />
            <Link
              href="#card-profile-employee-summary"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="employment.status" />
                </span>
              }
            />
            <Link
              href="#card-profile-employment-equity"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="employment.equity.groups" />
                </span>
              }
            />
            <Link
              href="#card-profile-description"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="about.me" />
                </span>
              }
            />
            <Link
              href="#card-profile-official-language"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="official.languages" />
                </span>
              }
            />
          </Link>

          <Link
            href="#divider-skills-and-comp"
            title={
              <span className="sideBarText" strong>
                <FormattedMessage id="skills.and.competencies" />
              </span>
            }
          >
            <Link
              href="#card-profile-skills"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="skills" />
                </span>
              }
            />
            <Link
              href="#card-profile-mentorship-skills"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="mentorship.skills" />
                </span>
              }
            />
            <Link
              href="#card-profile-competency"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="competencies" />
                </span>
              }
            />
          </Link>
          <Link
            href="#divider-qualifications"
            title={
              <span className="sideBarText" strong>
                <FormattedMessage id="employee.qualifications" />
              </span>
            }
          >
            <Link
              href="#card-profile-education"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="education" />
                </span>
              }
            />
            <Link
              href="#card-profile-experience"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="experience" />
                </span>
              }
            />
          </Link>

          <Link
            href="#divider-employee-growth"
            title={
              <span className="sideBarText" strong>
                <FormattedMessage id="employee.growth.interests" />
              </span>
            }
          >
            <Link
              href="#card-profile-learning-development"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="learning.development" />
                </span>
              }
            />
            <Link
              href="#card-profile-qualified-pools"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="qualified.pools" />
                </span>
              }
            />
            <Link
              href="#card-profile-talent-management"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="talent.management" />
                </span>
              }
            />
            <Link
              href="#card-profile-ex-feeder"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="ex.feeder" />
                </span>
              }
            />
            <Link
              href="#card-profile-career-interests"
              title={
                <span className="sideBarText">
                  <FormattedMessage id="career.interests" />
                </span>
              }
            />
          </Link>
          {isOwnersProfile && (
            <Link
              href="#divider-privateGroup"
              title={
                <span className="sideBarText" strong>
                  <FormattedMessage id="connections" />
                </span>
              }
            >
              <Link
                href="#card-profile-connections"
                title={
                  <span className="sideBarText">
                    <FormattedMessage id="connections" />
                  </span>
                }
              />
            </Link>
          )}
        </Anchor>
      </Col>
    </Row>
  );
};

ProfileSidebarContentView.propTypes = {
  isOwnersProfile: PropTypes.bool,
};

ProfileSidebarContentView.defaultProps = {
  isOwnersProfile: false,
};

export default ProfileSidebarContentView;
