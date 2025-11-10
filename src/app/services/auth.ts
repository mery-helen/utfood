import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import PocketBase from 'pocketbase';

export interface User {
  id: string;
  email: string;
  name: string;
  ra?: string;
  role: 'aluno' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pb: PocketBase;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Inicializar PocketBase com a URL do servidor
    // Para desenvolvimento local, usar http://localhost:8090
    // Para produção, ajustar conforme necessário
    this.pb = new PocketBase('http://localhost:8090');

    // Verificar se há uma sessão ativa ao inicializar o serviço
    this.checkAuthStatus();

    // Escutar mudanças no authStore
    this.pb.authStore.onChange(() => {
      this.checkAuthStatus();
    });
  }

  /**
   * Verifica o status atual de autenticação
   */
  private checkAuthStatus(): void {
    if (this.pb.authStore.isValid && this.pb.authStore.model) {
      const model = this.pb.authStore.model as any;
      const user: User = {
        id: model.id,
        email: model.email,
        name: model['name'] || '',
        ra: model['ra'] || '',
        role: model['role'] || 'aluno',
      };
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    }
  }

  /**
   * Realiza o login do usuário
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      const record = authData.record as any;
      const user: User = {
        id: record.id,
        email: record.email,
        name: record['name'] || '',
        ra: record['ra'] || '',
        role: record['role'] || 'aluno',
      };
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  /**
   * Realiza o logout do usuário
   */
  logout(): void {
    this.pb.authStore.clear();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isLoggedIn(): boolean {
    return this.pb.authStore.isValid;
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtém a instância do PocketBase
   */
  getPocketBase(): PocketBase {
    return this.pb;
  }

  /**
   * Registra um novo usuário
   */
  async register(userData: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    ra?: string;
    role: 'aluno' | 'admin';
  }): Promise<User> {
    try {
      const record = await this.pb.collection('users').create(userData);
      // Fazer login automaticamente após o registro
      return this.login(userData.email, userData.password);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }
}
