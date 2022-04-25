import { useState } from "react";
import { Row, Col, Tag, Input } from "antd";

const SupervisorsPopupContent = ({
  supervisors,
  selectedSupervisors,
  onClick,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text) => {
    setSearchText(text);
  };

  return (
    <div style={{ width: 300 }}>
      <section>
        <article
          id="supervisors-list-content"
          className="scrollbar-normal"
          style={{ minHeight: "300px", maxHeight: "300px" }}
        >
          <Row gutter={[10, 5]}>
            <Col xs={24}>
              <Input
                allowClear
                autoFocus
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </Col>
            <Col xs={24}>
              {supervisors
                .filter(
                  (supervisor) =>
                    selectedSupervisors.filter(
                      (s) => s.MemberID === supervisor.MemberID
                    ).length === 0
                )
                .filter((supervisors) =>
                  supervisors.FullName.includes(searchText)
                )
                .map((supervisor) => (
                  <Tag
                    key={supervisor.MemberID}
                    color="magenta"
                    onClick={() => onClick(supervisor)}
                    style={{ cursor: "pointer", margin: 5 }}
                  >
                    {supervisor.FullName}
                  </Tag>
                ))}
            </Col>
          </Row>
        </article>
      </section>
    </div>
  );
};

export default SupervisorsPopupContent;
