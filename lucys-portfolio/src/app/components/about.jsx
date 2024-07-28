import Image from "next/image";
import aboutText from './about-text'; 

const About = () => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <div className="flex-about">
        <div className="about-text">
        <p>{aboutText}</p>
        </div>
        <div className="about-img">
          <Image src='/images/about-me.jpeg' className="profile-img" width={300} height={500}/>
        </div>
      </div>
    </div>
  )
}

export default About;