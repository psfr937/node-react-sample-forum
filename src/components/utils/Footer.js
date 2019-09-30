import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/main.scss';

const Footer = () => (
  <div className={styles.footerContainer}>
    <div className={styles.footerNav}>
      <div className={styles.footerCol}>
        <h5 className={styles.footerTitle}>
          Drivo
        </h5>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerCol}>
        <h5 className={styles.footerTitle}>
          Company
        </h5>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">About</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Press</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Legal</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Privacy Policy</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerCol}>
        <h5 className={styles.footerTitle}>
          Network
        </h5>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.footerLink} to="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>

    <div className={styles.footerCopyrightWrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a className={styles.footerLink} href="https://stackoverflow.blog?blb=1">
            Blog
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.footerLink} href="https://stackoverflow.blog?blb=1">
            Facebook
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.footerLink} href="https://stackoverflow.blog?blb=1">
            Twitter
          </a>
        </li>
        <li className={styles.item}>
          <a href="https://stackoverflow.blog?blb=1">
            Linkedin
          </a>
        </li>
      </ul>
      <p className={styles.footerCopyright}>© 2018 All right reserved by Drivo Limited</p>
    </div>

  </div>
);



export default Footer;
