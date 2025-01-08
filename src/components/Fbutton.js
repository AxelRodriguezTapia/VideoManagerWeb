import React from 'react';
import { IoHeart, IoHeartOutline, IoHome, IoHomeOutline, IoPerson, IoPersonOutline } from 'react-icons/io5'; // Usamos react-icons

const FButton = ({ selectedIcon, unselectedIcon, id, isSelected, onPress }) => {
  // Mapeamos los iconos a los componentes de react-icons
  const iconMap = {
    heart: <IoHeart />,
    'heart-outline': <IoHeartOutline />,
    'home-plus': <IoHome />,
    'home-outline': <IoHomeOutline />,
    account: <IoPerson />,
    'account-outline': <IoPersonOutline />,
  };

  return (
    <button 
      onClick={() => onPress(id)} 
      style={styles.buttonContainer}
    >
      <div style={styles.iconContainer}>
        {isSelected ? iconMap[selectedIcon] : iconMap[unselectedIcon]}
      </div>
    </button>
  );
};

const styles = {
  buttonContainer: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default FButton;
