import Link from "next/link";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo">
        <Link href="/">
          Lucy's Portfolio
        </Link>
      </div>
      <a href="https://drive.google.com/file/d/13-y51m_KYDLjDJ0GEnc56l1qte1wjEyh/view?usp=sharing" className="cta-btn">Resume</a>
    </div>
  )
}

export default Navbar;