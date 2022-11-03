import React, { useState, useEffect } from 'react';

import Requests from '../../../Requests';
import Icons from '../../../Resources/Icons';
import { formatPhone, OuterLink } from '../../Common';

import './Footer.css';

const SocialIcon = (link) => {
  let title = '';
  let icon = <i />;
  if (link.includes('github')) {
    title = 'GitHub';
    icon = <Icons.Github className="footer-social-icon" />;
  } else if (link.includes('linkedin')) {
    title = 'LinkedIn';
    icon = <Icons.Linkedin className="footer-social-icon" />;
  } else if (link.includes('instagram')) {
    title = 'Instagram';
    icon = <Icons.Instagram className="footer-social-icon" />;
  } else if (link.includes('mailto:')) {
    title = link.split(':')[1].toString();
    icon = <Icons.Email className="footer-social-icon" />;
  } else if (link.includes('tel:')) {
    title = `+1 ${formatPhone(link.split(':')[1].substring(2))}`;
    icon = <Icons.Phone className="footer-social-icon" />;
  }

  return {
    title,
    icon
  };
};

function ContactLink({ link }) {
  const { title, icon } = SocialIcon(link);
  return (
    <OuterLink
      className="footer-social-link clear-link"
      title={title}
      href={link}
      text={icon}
    />
  );
}

function Contact({ name, avatar, email, phone, socialLinks }) {
  return (
    <div className="contact-box">
      {avatar && (
        <img
          className="footer-contact-img"
          loading="lazy"
          src={avatar}
          alt="contact"
        />
      )}
      <div className="footer-contact-info">
        {name && <div className="footer-contact-name">{name}</div>}
        {socialLinks && (
          <div className="footer-social-links">
            {socialLinks
              ?.sort((a, b) => a.localeCompare(b))
              ?.map((link, i) => (
                <ContactLink
                  key={i}
                  link={link}
                />
              ))}
            {email && <ContactLink link={`mailto:${email}`} />}
            {phone && <ContactLink link={`tel:+1${phone}`} />}
          </div>
        )}
      </div>
    </div>
  );
}

const FooterLeft = (
  <div className="footer-left">
    <div className="footer-brand">
      <Icons.Logo />
      CrystalBox&#174;
      <hr />
    </div>
    <p className="footer-article">
      CrystalBox is a demo project for the courses&nbsp;
      <OuterLink
        href="http://marceljar.ca/"
        text="BTR490 - BTS530 - BTS630"
      />
      &nbsp;Team Project at&nbsp;
      <OuterLink
        href="https://www.senecacollege.ca/home.html"
        text="Seneca College"
      />
      .
    </p>
  </div>
);

const FooterCenter = (
  <div className="footer-center">
    <p>
      We hope our effort in demonstrating a neat Client Application, Secure API,
      Hardware Integration, Mobile Application Integration, and Data
      Visualization will poke your interest or even inspire you to create
      something similar!
    </p>
    <br />
    <div>
      Crafted with&nbsp;
      <Icons.Heart color="red" />
      &nbsp;somewhere in&nbsp;
      <OuterLink
        href="https://en.wikipedia.org/wiki/Canada"
        text="Canada"
      />
    </div>
  </div>
);

function FooterRight({ contacts }) {
  return (
    <div className="footer-right">
      <h4>
        <b>Contact Us:</b>
      </h4>
      <hr />
      {contacts?.map((user, i) => (
        <Contact
          key={i}
          {...user}
        />
      ))}
    </div>
  );
}

export default function Footer() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const getFooter = async () => {
      try {
        if (contacts.length) return;
        const res = await Requests.Public.Get.footerData(controller.signal);
        if (res.status !== 200) throw new Error("Couldn't get footer data");
        setContacts(res.data);
      } catch {
        setContacts([]);
      }
    };

    getFooter();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <footer id="footer">
      <div className="footer-container">
        {FooterLeft}
        <span className="footer-divider" />
        {FooterCenter}
        <span className="footer-divider" />
        <FooterRight contacts={contacts} />
      </div>
    </footer>
  );
}
