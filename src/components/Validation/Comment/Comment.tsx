import React from 'react'
import {Row, Col, Avatar,Space} from "antd";
import "./Comment.css";

function Comment() {
  return (
    <Row className="Comment-card" align="middle">
      <Col xs={24} lg={12}>
        <Space size="large">
        <Avatar style={{ backgroundColor: "#EE5959", verticalAlign: 'middle' }}>
        {1}
      </Avatar>
      <span className="title">Formulary setup</span>
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{textAlign:"center"}}>
        <Space size="large">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          <span className="date">August 11, 2020</span>
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{textAlign:"center"}}>
        <Space size="small">
          {1}
          <img src="/images/comment.png" alt=""/>
        </Space>
      </Col>
      <Col xs={24} lg={4} style={{textAlign:"right"}}>

          <img src="/images/arrow.png" alt=""/>
  
      </Col>
    </Row>
  )
}

export default Comment
