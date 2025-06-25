import React from 'react';
import { User } from '../../types/User';
import { UserService } from '../../services/userService';
import styles from './UserModal.module.css';

interface UserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const mapUrl = UserService.generateMapUrl(user.address.geo.lat, user.address.geo.lng);

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} data-testid="modal-backdrop">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <h2 className={styles.title}>{user.name}</h2>
            <a href={`mailto:${user.email}`} className={styles.email}>{user.email}</a>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Address</h3>
            <div className={styles.addressText}>
              {user.address.street}, {user.address.suite}
            </div>
            <div className={styles.addressText}>
              {user.address.city}, {user.address.zipcode}
            </div>
            <div className={styles.mapLinkContainer}>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                📍 View on map
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Contact</h3>
            <div className={styles.field}>
              <span className={styles.label}>Phone:</span>
              <span className={styles.value}>{user.phone}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Website:</span>
              <span className={styles.value}>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </span>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Company</h3>
            <div className={styles.field}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user.company.name}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Catch Phrase:</span>
              <span className={styles.value}>"{user.company.catchPhrase}"</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Business:</span>
              <span className={styles.value}>{user.company.bs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 