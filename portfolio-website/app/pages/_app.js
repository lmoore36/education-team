import Layout from "../layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
} 


    // <main>
    //   <Nav/> 
    //   <div class="body">
    //     <div class="about-container">
    //         <div class="about-text">
    //             <h1 class="about-h1"> About Me!</h1>
    //             <p class="about-p"> My name is Lucy and I'm a current Sophomore at the University of North Carolina at Chapel Hill! 
    //               I'm double majoring in Computer Science and Peace, War, and Defense with a minor in Data Science. </p>
              
    //             <div class="redirect-buttons">
    //               <a href="https://www.linkedin.com/in/lucy-moore36/" class="profile-button"> LinkedIn </a>
    //               <a href="https://github.com/lmoore36" class="profile-button"> GitHub </a>
    //             </div>
    //         </div>  
          
    //         <div class="about-image">
    //           <image src="/IMG_1239.JPEG"> </image>
    //         </div>
    //     </div>

    //     <div class="center-content">
    //       <h2 class="projects-description">Check out my projects!</h2>
    //       <a href="/projects" class="button-style"> Learn More</a>
    //     </div> 
    //   </div> 
    // </main>
