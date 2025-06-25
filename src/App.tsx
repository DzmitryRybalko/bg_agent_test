import React, { useState, useEffect } from 'react';
import { User } from './types/User';
import { UserService } from './services/userService';
import { UserTable } from './components/UserTable/UserTable';
import { UserModal } from './components/UserModal/UserModal';
import styles from './App.module.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await UserService.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  if (loading) {
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner} role="status" aria-label="Loading"></div>
            <p>Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Error</h2>
            <p>{error}</p>
            <button className={styles.retryButton} onClick={loadUsers}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>User Directory</h1>
          <p className={styles.subtitle}>
            Manage and view user information from JSONPlaceholder API
          </p>
          <div className={styles.stats}>
            <span className={styles.userCount}>
              {users.length} {users.length === 1 ? 'user' : 'users'} found
            </span>
          </div>
        </header>

        <main className={styles.main}>
          <UserTable
            users={users}
            onUserClick={handleUserClick}
            onDeleteUser={handleDeleteUser}
          />
        </main>

        {selectedUser && (
          <UserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App; 