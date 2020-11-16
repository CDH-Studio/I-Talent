import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { LockOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";
import "./PrivacyModalView.less";

const PrivacyModalView = ({ handleOk, handleCancel, showModal, locale }) => {
  return (
    <Modal
      title={
        <>
          <LockOutlined /> <FormattedMessage id="privacy.modal.header" />
          <div className="privacyModalHeaderExtra">
            <ChangeLanguage />
          </div>
        </>
      }
      visible={showModal}
      closable={false}
      maskClosable={false}
      okText={
        <>
          <CheckOutlined className="ModalbBtnIcon" />
          <FormattedMessage id="privacy.modal.accept" />
        </>
      }
      cancelText={
        <>
          <CloseOutlined className="ModalbBtnIcon" />
          <FormattedMessage id="privacy.modal.decline" />
        </>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <div className="privacyModalContent">
        {locale === "ENGLISH" ? (
          <>
            <p>
              Please be advised that by logging in you have the ability to
              self-administer information about yourself. The collection of your
              self-administered information is known as your Profile information
              to showcase your professional history. You will be able to control
              who and what information I-Talent members at ISED can see in your
              profile settings.
            </p>
            <p>
              All personal information collected and used in this application is
              considered voluntarily provided and any use or disclosure will be
              governed by the rights of access to, correction of, and protection
              of personal information under the Privacy Act.
            </p>
            <p>
              Your personal information will be used for human resources related
              activities, such as, but not limited to, the following purposes:
              match interested and qualified people to positions or roles,
              identify skills and competencies at various levels, design
              development strategies, and planning and reporting. The personal
              information collected will be retained and disposed of in
              accordance with the ISED retention and disposal schedule.
            </p>
            <p>
              You are required to respect the obligations set out in the Values
              and Ethics Code for the Public Sector and as such are held
              accountable for all your Profile information that you have
              self-administered.
            </p>
            <p>
              Please note that the Department may remove your profile at its
              sole discretion.
            </p>
            <p>
              Please refer to the Terms and Conditions and Privacy for
              additional privacy related information and your responsibility
              when entering your profile information.
            </p>
            <p>
              If you require clarification or more information on privacy issues
              and the Privacy Act, you can contact our ATIP Services at
              atip-aiprpa.ic@canada.ca.
            </p>
            <p>
              By submitting your information, you are confirming that you have
              accessed this Privacy notice statement and disclaimer and are now
              ready to provide your personal information in accordance with it.
            </p>
          </>
        ) : (
          <>
            <p>
              Veuillez noter qu&apos;en vous connectant, vous avez la
              possibilité de auto-administrer des informations vous concernant.
              La collection de votre les informations auto-administrées sont
              appelées vos informations de profil pour mettre en valeur votre
              histoire professionnelle. Vous pourrez contrôler qui et quelles
              informations les membres I-Talent d&apos;ISDE peuvent voir dans
              votre paramètres de profil.
            </p>
            <p>
              Toutes les informations personnelles collectées et utilisées dans
              cette application sont considéré comme fourni volontairement et
              toute utilisation ou divulgation sera régis par les droits
              d&apos;accès, de correction et de protection des renseignements
              personnels en vertu de la Loi sur la protection des renseignements
              personnels.
            </p>
            <p>
              Vos informations personnelles seront utilisées pour les ressources
              humaines liées activités, telles que, mais sans s&apos;y limiter,
              les objectifs suivants: jumeler des personnes intéressées et
              qualifiées à des postes ou des rôles, identifier les aptitudes et
              compétences à différents niveaux, concevoir stratégies de
              développement, planification et rapports. Le personnel les
              informations recueillies seront conservées et éliminées dans
              conformément au calendrier de conservation et d&apos;élimination
              d&apos;ISDE.
            </p>
            <p>
              Vous êtes tenu de respecter les obligations énoncées dans les
              Valeurs et code d&apos;éthique du secteur public et, à ce titre,
              responsable de toutes les informations de votre profil que vous
              avez auto-administré.
            </p>
            <p>
              Veuillez noter que le Ministère peut supprimer votre profil à son
              seule discrétion.
            </p>
            <p>
              Veuillez consulter les conditions générales et la confidentialité
              pour informations supplémentaires relatives à la confidentialité
              et votre responsabilité lors de la saisie des informations de
              votre profil.
            </p>
            <p>
              Si vous avez besoin de clarification ou de plus
              d&apos;informations sur les problèmes de confidentialité et la Loi
              sur la protection des renseignements personnels, vous pouvez
              contacter nos services AIPRP à atip-aiprpa.ic@canada.ca.
            </p>
            <p>
              En soumettant vos informations, vous confirmez que vous avez
              accédé à cette déclaration de confidentialité et à cette clause de
              non-responsabilité et prêt à fournir vos informations personnelles
              conformément à celui-ci.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

PrivacyModalView.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  locale: PropTypes.oneOf(["FRENCH", "ENGLISH"]).isRequired,
};

export default PrivacyModalView;
