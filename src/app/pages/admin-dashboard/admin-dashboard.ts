import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { DataService, ItemCantina, Categoria } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardComponent implements OnInit {
  itens: ItemCantina[] = [];
  categorias: Categoria[] = [];
  isLoading = true;
  error: string | null = null;
  success: string | null = null;
  showForm = false;
  editingItem: ItemCantina | null = null;
  itemForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      preco: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required]],
      disponivel: [true],
    });
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;

      // Carregar categorias
      this.categorias = await this.dataService.getCategorias();

      // Carregar todos os itens (incluindo indisponíveis)
      this.itens = await this.dataService.getTodosOsItensAdmin();
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      this.error = 'Erro ao carregar os dados. Tente novamente mais tarde.';
    } finally {
      this.isLoading = false;
    }
  }

  openForm(item?: ItemCantina): void {
    this.showForm = true;
    this.error = null;
    this.success = null;

    if (item) {
      this.editingItem = item;
      this.itemForm.patchValue({
        nome: item.nome,
        descricao: item.descricao,
        preco: item.preco,
        categoria: item.categoria,
        disponivel: item.disponivel,
      });
    } else {
      this.editingItem = null;
      this.itemForm.reset({ disponivel: true });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingItem = null;
    this.itemForm.reset({ disponivel: true });
  }

  async saveItem(): Promise<void> {
    if (this.itemForm.invalid) {
      this.error = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    try {
      this.error = null;
      this.success = null;

      const formData = this.itemForm.value;

      if (this.editingItem) {
        // Atualizar item existente
        await this.dataService.atualizarDisponibilidade(
          this.editingItem.id,
          formData.disponivel
        );
        this.success = 'Item atualizado com sucesso!';
      } else {
        // Adicionar novo item
        await this.dataService.adicionarItem({
          nome: formData.nome,
          descricao: formData.descricao,
          preco: formData.preco,
          categoria: formData.categoria,
          disponivel: formData.disponivel,
        });
        this.success = 'Item adicionado com sucesso!';
      }

      this.closeForm();
      await this.loadData();
    } catch (err) {
      console.error('Erro ao salvar item:', err);
      this.error = 'Erro ao salvar o item. Tente novamente.';
    }
  }

  async deleteItem(itemId: string): Promise<void> {
    if (!confirm('Tem certeza que deseja remover este item?')) {
      return;
    }

    try {
      this.error = null;
      this.success = null;

      await this.dataService.removerItem(itemId);
      this.success = 'Item removido com sucesso!';
      await this.loadData();
    } catch (err) {
      console.error('Erro ao remover item:', err);
      this.error = 'Erro ao remover o item. Tente novamente.';
    }
  }

  async toggleDisponibilidade(item: ItemCantina): Promise<void> {
    try {
      this.error = null;
      this.success = null;

      await this.dataService.atualizarDisponibilidade(item.id, !item.disponivel);
      this.success = `Item marcado como ${!item.disponivel ? 'disponível' : 'indisponível'}`;
      await this.loadData();
    } catch (err) {
      console.error('Erro ao atualizar disponibilidade:', err);
      this.error = 'Erro ao atualizar o item. Tente novamente.';
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categorias.find((c) => c.id === categoryId);
    return category ? category.nome : categoryId;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  clearMessages(): void {
    this.error = null;
    this.success = null;
  }
}
