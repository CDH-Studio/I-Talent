import React from "react";
import PropTypes from "prop-types";
import { Modal, Tabs } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { TabPane } = Tabs;

const PrivacyModalView = ({ handleOk, handleCancel, showModal, keycloak }) => {
  return (
    <Modal
      title={
        <>
          <LockOutlined /> Privacy Agreement
        </>
      }
      visible={showModal && keycloak && keycloak.authenticated}
      maskClosable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
    >
      <Tabs defaultActiveKey="1" size={"small"} style={{ marginTop: "-20px" }}>
        <TabPane tab="English" key="1">
          <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
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
          </div>
        </TabPane>
        <TabPane tab="Français" key="2">
          <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
            <p>
              Veuillez noter qu'en vous connectant, vous avez la possibilité de
              auto-administrer des informations vous concernant. La collection
              de votre les informations auto-administrées sont appelées vos
              informations de profil pour mettre en valeur votre histoire
              professionnelle. Vous pourrez contrôler qui et quelles
              informations les membres I-Talent d'ISDE peuvent voir dans votre
              paramètres de profil.
            </p>
            <p>
              Toutes les informations personnelles collectées et utilisées dans
              cette application sont considéré comme fourni volontairement et
              toute utilisation ou divulgation sera régis par les droits
              d'accès, de correction et de protection des renseignements
              personnels en vertu de la Loi sur la protection des renseignements
              personnels.
            </p>
            <p>
              Vos informations personnelles seront utilisées pour les ressources
              humaines liées activités, telles que, mais sans s'y limiter, les
              objectifs suivants: jumeler des personnes intéressées et
              qualifiées à des postes ou des rôles, identifier les aptitudes et
              compétences à différents niveaux, concevoir stratégies de
              développement, planification et rapports. Le personnel les
              informations recueillies seront conservées et éliminées dans
              conformément au calendrier de conservation et d'élimination
              d'ISDE.
            </p>
            <p>
              Vous êtes tenu de respecter les obligations énoncées dans les
              Valeurs et code d'éthique du secteur public et, à ce titre,
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
              Si vous avez besoin de clarification ou de plus d'informations sur
              les problèmes de confidentialité et la Loi sur la protection des
              renseignements personnels, vous pouvez contacter nos services
              AIPRP à atip-aiprpa.ic@canada.ca.
            </p>
            <p>
              En soumettant vos informations, vous confirmez que vous avez
              accédé à cette déclaration de confidentialité et à cette clause de
              non-responsabilité et prêt à fournir vos informations personnelles
              conformément à celui-ci.
            </p>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

PrivacyModalView.propTypes = {
  showModal: PropTypes.bool.isRequired,
  keycloak: PropTypes.object.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default PrivacyModalView;
