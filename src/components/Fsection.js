import React from 'react';
import { LinearGradient } from 'react-gradient';
import FButton from './Fbutton.js';

const FSection = ({ currentSection, onPress }) => {
  return (
    <LinearGradient 
      colors={['#3498db', '#2980b9', '#1abc9c']} 
      style={styles.gradientBackground}
    >
      <div style={styles.buttonRow}>
        <div style={styles.buttonContainer}>
          <FButton 
            selectedIcon="heart" 
            unselectedIcon="heart-outline"
            id={2} 
            onPress={onPress}
            isSelected={currentSection === 2} 
          />
        </div>

        <div style={styles.buttonContainer}>
          <FButton 
            selectedIcon="home-plus" 
            unselectedIcon="home-outline" 
            id={1} 
            onPress={onPress} 
            isSelected={currentSection === 1} 
          />
        </div>

        <div style={styles.buttonContainer}>
          <FButton 
            selectedIcon="account" 
            unselectedIcon="account-outline"
            id={3} 
            onPress={onPress}
            isSelected={currentSection === 3} 
          />
        </div>
      </div>
    </LinearGradient>
  );
};

const styles = {
  gradientBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100px', // Ajusta la altura de los botones
  },
  buttonContainer: {
    margin: '0 25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default FSection;
