import React from 'react';
import { User } from '../../types/User';

import styles from './UserTable.module.css';

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (userId: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onUserClick, onDeleteUser }) => {
  const handleDeleteClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDeleteUser(userId);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Name / Email</div>
          <div className={styles.headerCell}>Address</div>
          <div className={styles.headerCell}>Phone</div>
          <div className={styles.headerCell}>Website</div>
          <div className={styles.headerCell}>Company</div>
          <div className={styles.headerCell}>Actions</div>
        </div>
        
        <div className={styles.tableBody}>
          {users.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No users found</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className={styles.tableRow}
                onClick={() => onUserClick(user)}
                data-testid={`user-row-${user.id}`}
              >
                <div className={styles.cell}>
                  <div className={styles.nameEmail}>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.email}>{user.email}</div>
                  </div>
                </div>
                
                <div className={styles.cell}>
                  <div className={styles.address}>
                    <div>{user.address.street}, {user.address.suite}</div>
                    <div>{user.address.city}, {user.address.zipcode}</div>
                  </div>
                </div>
                
                <div className={styles.cell}>
                  <a href={`tel:${user.phone}`} className={styles.phoneLink} onClick={(e) => e.stopPropagation()}>
                    {user.phone}
                  </a>
                </div>
                
                <div className={styles.cell}>
                  <a 
                    href={`http://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </div>
                
                <div className={styles.cell}>
                  <div className={styles.company}>
                    <div className={styles.companyName}>{user.company.name}</div>
                    <div className={styles.companyCatchPhrase}>{user.company.catchPhrase}</div>
                  </div>
                </div>
                
                <div className={styles.cell}>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteClick(e, user.id)}
                    aria-label={`Delete user ${user.name}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}; 