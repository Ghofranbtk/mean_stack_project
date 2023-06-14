import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  signUp(user: any) {
    return this.httpClient.post<{ message: String, id: any }>(`${this.userUrl}/api/user/users/add`, user);
  }

  logIn(user: any) {
    return this.httpClient.post<{ name: any, message: string, token: any }>(`${this.userUrl}/api/user/users/login`, user);
  }

  editUser(user: any) {
    return this.httpClient.put<{ message: String, id: any, error: String }>(`${this.userUrl}/api/user/edit/${user._id}`, user);
  }
  getAllUsers() {
    return this.httpClient?.get<{ users: any , nbr : any }>(`${this.userUrl}/api/user/users`);
  }
  getUserById(id: any) {
    return this.httpClient?.get<{ user: any, message: String }>(`${this.userUrl}/api/user/users/${id}`);
  }
  getUserByEmail(email: any) {
    return this.httpClient?.get<{ user: any, message: String }>(`${this.userUrl}/api/user/email/${email}`);
  }

  deleteUser(id: any) {
    return this.httpClient?.delete<{ message: string }>(`${this.userUrl}/api/user/users/${id}`);
  }
  decryptPwd(pwd: any) {
    return this.httpClient?.post<{ message: string }>(`${this.userUrl}/api/user/decrypt/pwd`, pwd);
  }
  forgotPassword(data: any) {
    return this.httpClient.post<{ token: any }>(`${this.userUrl}/api/forgotPassword/forgot-password`, data);
  }

  resetPassoword(resetData: any) {
    return this.httpClient.post(`${this.userUrl}/api/resetPassword/reset-password`, resetData);
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  NumberOfOrders(id : any){
    return this.httpClient.get<{ number: any}>(`${this.userUrl}/api/user/orders/${id}`);
  }

}
