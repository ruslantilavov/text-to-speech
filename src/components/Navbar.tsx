import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import {
  MenuOutlined,
  TranslationOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./Navbar.css";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "features",
      icon: <InfoCircleOutlined />,
      label: "Features",
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Contact",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    onNavigate(key);
    setDrawerVisible(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <TranslationOutlined />
          </div>
          <span className="brand-text">GapGo</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={handleMenuClick}
            className="navbar-menu"
          />
        </div>

        <div className="navbar-actions">
          <Button
            type="primary"
            className="use-translator-btn"
            icon={<TranslationOutlined />}
            onClick={() => onNavigate("translator")}
          >
            Use Translator
          </Button>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="mobile-menu-btn"
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="GapGo"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={handleMenuClick}
          className="mobile-menu"
        />
        <div className="mobile-cta">
          <Button
            type="primary"
            block
            size="large"
            icon={<TranslationOutlined />}
            onClick={() => {
              onNavigate("translator");
              setDrawerVisible(false);
            }}
          >
            Use Translator
          </Button>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
