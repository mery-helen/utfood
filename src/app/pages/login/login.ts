import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements OnInit {
  studentForm!: FormGroup;
  adminForm!: FormGroup;
  activeTab: 'student' | 'admin' = 'student';
  isLoading = false;
  studentError: string | null = null;
  adminError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    // Formulário para alunos
    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    // Formulário para administradores
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  switchTab(tab: 'student' | 'admin'): void {
    this.activeTab = tab;
    this.studentError = null;
    this.adminError = null;
  }

  async onStudentLogin(): Promise<void> {
    if (this.studentForm.invalid) {
      this.studentError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.studentError = null;

    try {
      const { email, password } = this.studentForm.value;
      const user = await this.authService.login(email, password);

      if (user.role === 'aluno' || user.role === 'admin') {
        // Redirecionar para o cardápio
        this.router.navigate(['/cardapio']);
      } else {
        this.studentError = 'Usuário não autorizado.';
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      this.studentError = 'Email ou senha inválidos. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  async onAdminLogin(): Promise<void> {
    if (this.adminForm.invalid) {
      this.adminError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.adminError = null;

    try {
      const { email, password } = this.adminForm.value;
      const user = await this.authService.login(email, password);

      if (user.role === 'admin') {
        // Redirecionar para o painel de administração
        this.router.navigate(['/admin']);
      } else {
        this.adminError = 'Apenas administradores podem acessar este painel.';
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      this.adminError = 'Email ou senha inválidos. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  clearStudentError(): void {
    this.studentError = null;
  }

  clearAdminError(): void {
    this.adminError = null;
  }
}
