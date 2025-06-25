import { User } from '../types/User';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export class UserService {
  static async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async fetchUser(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  static generateMapUrl(lat: string, lng: string): string {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
} 