import React from "react";
import { List } from "antd";

import { useSelector } from "react-redux";

const OrgTreeView = ({ datax }) => {
  const { locale } = useSelector((state) => state.settings);

  const data = [
    { ENGLISH: "ENGLISH  asd 1", FRENCH: "FRENCH asdas 1" },
    { ENGLISH: "ENGLISH  asd2", FRENCH: "FRENCH asdddas 2" },
    { ENGLISH: "ENGLISH  dasaasd 3", FRENCH: "FRENCH asddasdaaas 3" },
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <List size="small" bordered>
        {data.map((item, index) => (
          <List.Item style={{ paddingLeft: `${1 + index * 0.5}em` }}>
            {item[locale]}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default OrgTreeView;
