import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserService } from './userService';
import { User } from '../types/User';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

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

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchUsers', () => {
    it('fetches users successfully', async () => {
      const mockUsers = [mockUser];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const result = await UserService.fetchUsers();

      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(result).toEqual(mockUsers);
    });

    it('throws error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(UserService.fetchUsers()).rejects.toThrow('HTTP error! status: 404');
      expect(console.error).toHaveBeenCalledWith('Error fetching users:', expect.any(Error));
    });

    it('throws error when fetch fails', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(UserService.fetchUsers()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error fetching users:', networkError);
    });
  });

  describe('fetchUser', () => {
    it('fetches single user successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await UserService.fetchUser(1);

      expect(mockFetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
      expect(result).toEqual(mockUser);
    });

    it('throws error when response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(UserService.fetchUser(1)).rejects.toThrow('HTTP error! status: 404');
      expect(console.error).toHaveBeenCalledWith('Error fetching user 1:', expect.any(Error));
    });

    it('throws error when fetch fails', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(UserService.fetchUser(1)).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Error fetching user 1:', networkError);
    });
  });

  describe('generateMapUrl', () => {
    it('generates correct Google Maps URL', () => {
      const lat = '-37.3159';
      const lng = '81.1496';
      
      const result = UserService.generateMapUrl(lat, lng);
      
      expect(result).toBe('https://www.google.com/maps?q=-37.3159,81.1496');
    });

    it('handles different coordinate formats', () => {
      const result1 = UserService.generateMapUrl('0', '0');
      const result2 = UserService.generateMapUrl('40.7128', '-74.0060');
      
      expect(result1).toBe('https://www.google.com/maps?q=0,0');
      expect(result2).toBe('https://www.google.com/maps?q=40.7128,-74.0060');
    });
  });
}); 