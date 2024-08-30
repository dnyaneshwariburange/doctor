import React from 'react';
import styles from '../assets/css/Home.module.css';
import Image from "../components/img2.png"


const Home = () => {
  return (
    <div style={{ backgroundImage:`url(${Image})`,backgroundRepeat:"no-repeat", 

    height: '100vh',
    width: '96.7vw', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
  }}>


    
    <div className={styles.container}>
      <h1>Find The Right Doctor 
          Anytime,
          Every time.
      </h1>
     
    </div>
    </div>
  );
};

export default Home;