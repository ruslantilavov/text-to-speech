import React from "react";
import { Button, Card, Collapse, Row, Col, Typography } from "antd";
import {
  SoundOutlined,
  CameraOutlined,
  FileTextOutlined,
  GlobalOutlined,
  TeamOutlined,
  BookOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./LandingPageNew.css";

const { Title, Paragraph, Text } = Typography;

interface LandingPageProps {
  onNavigate?: (section: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <SoundOutlined className="feature-icon" />,
      title: "Real-Time Voice Translation",
      description:
        "Speak naturally into your device and GapGo will provide instant audio translation, making face-to-face conversations flow smoothly and clearly.",
    },
    {
      icon: <CameraOutlined className="feature-icon" />,
      title: "Camera & Image Translation",
      description:
        "Point your camera at signs, menus, or posters. GapGo instantly translates the text on your screen, turning your surroundings into a familiar landscape.",
    },
    {
      icon: <FileTextOutlined className="feature-icon" />,
      title: "Text & Document Translation",
      description:
        "Type or paste any text—from a simple message to an important email—and get a fast, precise translation you can trust and share in seconds.",
    },
  ];

  const benefits = [
    {
      icon: <GlobalOutlined className="benefit-icon" />,
      title: "Travel with Absolute Confidence",
      description:
        "Never worry about navigating a new country again. Order food, ask for help, and connect with locals on a deeper level. GapGo is the ultimate travel companion that ensures you're always understood.",
    },
    {
      icon: <TeamOutlined className="benefit-icon" />,
      title: "Unlock Global Opportunities",
      description:
        "Step into international business meetings and negotiations with power. Understand foreign clients and collaborate with global teams seamlessly, ensuring no detail is lost in translation.",
    },
    {
      icon: <CheckCircleOutlined className="benefit-icon" />,
      title: "Create Genuine Connections",
      description:
        "Language should bring people together, not keep them apart. Whether you're connecting with family overseas or making new friends, GapGo helps you build genuine relationships without the language barrier.",
    },
  ];

  const useCases = [
    {
      icon: <GlobalOutlined className="usecase-icon" />,
      title: "For the Traveler",
      description:
        "Effortlessly navigate public transport, read restaurant menus like a local, and experience the culture without hesitation. Your adventure just became limitless.",
    },
    {
      icon: <TeamOutlined className="usecase-icon" />,
      title: "For the Global Professional",
      description:
        "Communicate clearly in video calls, understand critical documents instantly, and network with international partners. Close the deal in any language.",
    },
    {
      icon: <BookOutlined className="usecase-icon" />,
      title: "For the Student",
      description:
        "Ace your language class, easily comprehend foreign academic texts, and chat with exchange students from around the world. Expand your mind and your friendships.",
    },
  ];

  const faqData = [
    {
      key: "1",
      label: "Is GapGo free to use?",
      children: (
        <p>
          GapGo offers a robust free version with access to all core translation
          features. We also have a Premium plan with advanced features like
          offline mode and unlimited translations for power users.
        </p>
      ),
    },
    {
      key: "2",
      label: "How many languages does it support?",
      children: (
        <p>
          GapGo supports over 100 languages and dialects, covering over 99% of
          the world's online population. Our AI is constantly learning and we
          add new languages regularly.
        </p>
      ),
    },
    {
      key: "3",
      label: "Do I need an internet connection for it to work?",
      children: (
        <p>
          An internet connection is required for most translations to ensure the
          highest accuracy. Our Premium subscription offers an offline mode for
          select language pairs.
        </p>
      ),
    },
    {
      key: "4",
      label: "How accurate are the translations?",
      children: (
        <p>
          GapGo is powered by a state-of-the-art neural machine translation
          engine, providing incredibly high accuracy that captures context and
          nuance, far surpassing traditional translation tools.
        </p>
      ),
    },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <Title level={1} className="hero-title">
              Speak the Language of Connection
            </Title>
            <Paragraph className="hero-subtitle">
              Instantly bridge any communication gap. GapGo offers real-time,
              AI-powered translation from any language to any language, right in
              your pocket.
            </Paragraph>
            <div className="hero-buttons">
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                className="hero-cta primary"
                onClick={() => onNavigate?.("translator")}
              >
                Try Translator Now
              </Button>
              {/* <Button
                size="large"
                icon={<DownloadOutlined />}
                className="hero-cta secondary"
              >
                Download GapGo for Free
              </Button> */}
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <PlayCircleOutlined className="play-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="problem-solution-section">
        <div className="container">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="problem-content">
                <Title level={2} className="section-title">
                  Ever been lost for words?
                </Title>
                <Paragraph className="section-description">
                  That moment of frustration is universal—feeling like an
                  outsider, missing business opportunities, or simply being
                  unable to ask for directions. Language barriers don't just
                  block words; they block connection.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="solution-content">
                <Title level={2} className="section-title">
                  With GapGo, Every Word is Understood.
                </Title>
                <Paragraph className="section-description">
                  We created GapGo to dissolve those barriers with a single tap.
                  It's more than an app; it's your universal translator,
                  providing seamless and accurate communication so you can
                  navigate your world with total confidence.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <Title level={2} className="section-title text-center">
            Everything You Need to Communicate Effortlessly
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="feature-card" hoverable>
                  <div className="feature-content">
                    {feature.icon}
                    <Title level={4}>{feature.title}</Title>
                    <Paragraph>{feature.description}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <Title level={2} className="section-title text-center">
            Why You'll Love GapGo
          </Title>
          <Row gutter={[32, 32]}>
            {benefits.map((benefit, index) => (
              <Col xs={24} md={8} key={index}>
                <div className="benefit-item">
                  {benefit.icon}
                  <Title level={4}>{benefit.title}</Title>
                  <Paragraph>{benefit.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <Title level={2} className="section-title text-center">
            Get Started in 3 Simple Steps
          </Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={6}>
              <div className="step-item">
                <div className="step-number">1</div>
                <Title level={4}>Download & Launch</Title>
                <Paragraph>
                  Get GapGo from the App Store or Google Play and open it.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="step-item">
                <div className="step-number">2</div>
                <Title level={4}>Select Your Languages</Title>
                <Paragraph>
                  Choose your source and target languages from our comprehensive
                  global list.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <div className="step-item">
                <div className="step-number">3</div>
                <Title level={4}>Translate Instantly</Title>
                <Paragraph>
                  Speak, scan with your camera, or type. Let GapGo handle the
                  rest.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="container">
          <Title level={2} className="section-title text-center">
            Designed for Your World
          </Title>
          <Row gutter={[32, 32]}>
            {useCases.map((useCase, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="usecase-card" hoverable>
                  <div className="usecase-content">
                    {useCase.icon}
                    <Title level={4}>{useCase.title}</Title>
                    <Paragraph>{useCase.description}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-content">
            <Title level={2} className="cta-title">
              Ready to Bridge the Gap?
            </Title>
            <Paragraph className="cta-subtitle">
              Start speaking a universal language today. Your next conversation
              is waiting.
            </Paragraph>
            <div className="cta-buttons">
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                className="cta-button primary"
                onClick={() => onNavigate?.("translator")}
              >
                Try Translator Now
              </Button>
              {/* <Button
                size="large"
                icon={<DownloadOutlined />}
                className="cta-button secondary"
              >
                Download GapGo Now
              </Button> */}
            </div>
            <div className="social-proof">
              <Text className="social-proof-text">
                Join 50,000+ users communicating globally!
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <Title level={2} className="section-title text-center">
            Frequently Asked Questions
          </Title>
          <div className="faq-container">
            <Collapse
              items={faqData}
              size="large"
              expandIcon={({ isActive }) => (
                <QuestionCircleOutlined rotate={isActive ? 90 : 0} />
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
