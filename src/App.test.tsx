import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { UserService } from './services/userService';
import { User } from './types/User';

// Mock the UserService
vi.mock('./services/userService');

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

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(UserService.fetchUsers).mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders users successfully after loading', async () => {
    vi.mocked(UserService.fetchUsers).mockResolvedValue(mockUsers);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('User Directory')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Manage and view user information from JSONPlaceholder API')).toBeInTheDocument();
    expect(screen.getByText('1 user found')).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    vi.mocked(UserService.fetchUsers).mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Failed to load users. Please try again later.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('handles retry functionality', async () => {
    vi.mocked(UserService.fetchUsers)
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValue(mockUsers);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Try Again'));
    
    await waitFor(() => {
      expect(screen.getByText('User Directory')).toBeInTheDocument();
    });
    
    expect(screen.getByText('1 user found')).toBeInTheDocument();
  });

  it('opens user modal when user is clicked', async () => {
    vi.mocked(UserService.fetchUsers).mockResolvedValue(mockUsers);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-row-1')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('user-row-1'));
    
    // Check for modal-specific content that appears only in the modal
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    vi.mocked(UserService.fetchUsers).mockResolvedValue(mockUsers);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-row-1')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('user-row-1'));
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });
  });

  it('handles user deletion', async () => {
    vi.mocked(UserService.fetchUsers).mockResolvedValue(mockUsers);
    vi.stubGlobal('confirm', vi.fn(() => true));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('1 user found')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByLabelText('Delete user Leanne Graham'));
    
    await waitFor(() => {
      expect(screen.getByText('0 users found')).toBeInTheDocument();
    });
  });

  it('displays correct user count for multiple users', async () => {
    const multipleUsers = [...mockUsers, { ...mockUsers[0], id: 2, name: 'John Doe' }];
    vi.mocked(UserService.fetchUsers).mockResolvedValue(multipleUsers);
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('2 users found')).toBeInTheDocument();
    });
  });
}); 