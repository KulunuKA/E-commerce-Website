import React from "react";
import { Card, Row, Col, Typography, Space, Badge } from "antd";
import {
  ShoppingCartOutlined,
  CrownOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  TruckFilled,
} from "@ant-design/icons";

const { Text, Title } = Typography;


export default function Benefit() {
  const benefits = [
    {
      icon: (
        <ShoppingCartOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
      ),
      title: "Latest Fashion Trends",
      subtitle: "For Everyone",
      description:
        "Discover the newest fashion trends curated for all styles and preferences",
      contact: {
        email: "online@fashionbug.lk",
        phone: "(+94) 112 633 744",
      },
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: (
        <TruckFilled  style={{ fontSize: "48px", color: "#52c41a" }} />
      ),
      title: "Worldwide Delivery",
      subtitle: "Island Wide & International",
      description:
        "Fast and reliable delivery service to your doorstep, wherever you are",
      features: [
        "Same Day Delivery",
        "International Shipping",
        "Order Tracking",
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <CrownOutlined style={{ fontSize: "48px", color: "#fa8c16" }} />,
      title: "Premium Quality",
      subtitle: "Unique Branded Clothing",
      description:
        "Incomparably classy and unique pieces that define your personal style",
      badge: "Premium",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  return (
    <div
      style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
        minHeight: "600px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Title
            level={2}
            style={{
              color: "#1a1a1a",
              marginBottom: "16px",
              fontSize: "42px",
              fontWeight: "700",
            }}
          >
            Why Choose Fashion Bug?
          </Title>
          <Text
            style={{
              fontSize: "18px",
              color: "#666",
              display: "block",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Experience excellence in fashion with our premium services and
            unmatched quality
          </Text>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {benefits.map((benefit, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: "20px",
                  border: "none",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  position: "relative",
                }}
                bodyStyle={{
                  padding: "40px 32px",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 40px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    background: benefit.gradient,
                    zIndex: 1,
                  }}
                />

                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{
                      background: `${benefit.gradient
                        .match(/[^,]+/)[0]
                        .replace("linear-gradient(135deg, ", "")
                        .trim()}15`,
                      borderRadius: "50%",
                      width: "96px",
                      height: "96px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      position: "relative",
                    }}
                  >
                    {benefit.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: "#1a1a1a",
                          fontSize: "24px",
                          fontWeight: "600",
                        }}
                      >
                        {benefit.title}
                      </Title>
                      {benefit.badge && (
                        <Badge
                          count={benefit.badge}
                          style={{
                            backgroundColor: "#fa8c16",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        />
                      )}
                    </div>

                    <Text
                      style={{
                        color: "#1890ff",
                        fontSize: "16px",
                        fontWeight: "500",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      {benefit.subtitle}
                    </Text>
                  </div>

                  <Text
                    style={{
                      color: "#666",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      display: "block",
                    }}
                  >
                    {benefit.description}
                  </Text>

                  {benefit.contact && (
                    <div
                      style={{
                        background: "#f8faff",
                        borderRadius: "12px",
                        padding: "20px",
                        marginTop: "16px",
                      }}
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <MailOutlined style={{ color: "#1890ff" }} />
                          <Text style={{ fontSize: "14px", fontWeight: "500" }}>
                            {benefit.contact.email}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <PhoneOutlined style={{ color: "#52c41a" }} />
                          <Text style={{ fontSize: "14px", fontWeight: "500" }}>
                            {benefit.contact.phone}
                          </Text>
                        </div>
                      </Space>
                    </div>
                  )}

                  {benefit.features && (
                    <div style={{ marginTop: "16px" }}>
                      <Space wrap style={{ justifyContent: "center" }}>
                        {benefit.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea15, #764ba215)",
                              border: "1px solid #667eea30",
                              borderRadius: "20px",
                              padding: "6px 14px",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#667eea",
                            }}
                          >
                            {feature}
                          </div>
                        ))}
                      </Space>
                    </div>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

   
    </div>
  );
}
