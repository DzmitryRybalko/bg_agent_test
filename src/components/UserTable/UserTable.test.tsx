import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from './UserTable';
import { User } from '../../types/User';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  }
];

describe('UserTable', () => {
  const mockOnUserClick = vi.fn();
  const mockOnDeleteUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user table with headers', () => {
    render(
      <UserTable
        users={mockUsers}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    expect(screen.getByText('Name / Email')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders user data correctly', () => {
    render(
      <UserTable
        users={mockUsers}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Kulas Light, Apt. 556')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough, 92998-3874')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
    expect(screen.getByText('hildegard.org')).toBeInTheDocument();
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
  });

  it('calls onUserClick when user row is clicked', () => {
    render(
      <UserTable
        users={mockUsers}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    const userRow = screen.getByTestId('user-row-1');
    fireEvent.click(userRow);

    expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('calls onDeleteUser when delete button is clicked', async () => {
    // Mock window.confirm to return true
    vi.stubGlobal('confirm', vi.fn(() => true));

    render(
      <UserTable
        users={mockUsers}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    const deleteButton = screen.getByLabelText('Delete user Leanne Graham');
    fireEvent.click(deleteButton);

    expect(mockOnDeleteUser).toHaveBeenCalledWith(1);
  });

  it('does not call onDeleteUser when confirm is cancelled', () => {
    // Mock window.confirm to return false
    vi.stubGlobal('confirm', vi.fn(() => false));

    render(
      <UserTable
        users={mockUsers}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    const deleteButton = screen.getByLabelText('Delete user Leanne Graham');
    fireEvent.click(deleteButton);

    expect(mockOnDeleteUser).not.toHaveBeenCalled();
  });

  it('shows empty state when no users', () => {
    render(
      <UserTable
        users={[]}
        onUserClick={mockOnUserClick}
        onDeleteUser={mockOnDeleteUser}
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
}); 