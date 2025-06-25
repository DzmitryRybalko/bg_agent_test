import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserModal } from './UserModal';
import { User } from '../../types/User';

const mockUser: User = {
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
};

describe('UserModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    render(
      <UserModal user={mockUser} isOpen={false} onClose={mockOnClose} />
    );

    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
  });

  it('renders user information when isOpen is true', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('displays all user details correctly', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    // Address details
    expect(screen.getByText('Kulas Light, Apt. 556')).toBeInTheDocument();
    expect(screen.getByText('Gwenborough, 92998-3874')).toBeInTheDocument();
    
    // Contact details
    expect(screen.getByText('Phone:')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-8031 x56442')).toBeInTheDocument();
    expect(screen.getByText('Website:')).toBeInTheDocument();
    expect(screen.getByText('hildegard.org')).toBeInTheDocument();
    
    // Company details
    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(screen.getByText('"Multi-layered client-server neural-net"')).toBeInTheDocument();
    expect(screen.getByText('harness real-time e-markets')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    // Click on the modal content
    fireEvent.click(screen.getByText('Address'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders correct map link', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    const mapLink = screen.getByText('📍 View on map');
    expect(mapLink).toHaveAttribute('href', 'https://www.google.com/maps?q=-37.3159,81.1496');
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders email as clickable link', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    const emailLink = screen.getByText('Sincere@april.biz');
    expect(emailLink).toHaveAttribute('href', 'mailto:Sincere@april.biz');
  });

  it('renders website as clickable link', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    const websiteLink = screen.getByText('hildegard.org');
    expect(websiteLink).toHaveAttribute('href', 'http://hildegard.org');
    expect(websiteLink).toHaveAttribute('target', '_blank');
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper accessibility attributes', () => {
    render(
      <UserModal user={mockUser} isOpen={true} onClose={mockOnClose} />
    );

    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });
}); 