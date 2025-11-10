import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { DataService, ItemCantina, Categoria, Prato } from '../../services/data';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.scss',
})
export class CardapioComponent implements OnInit {
  categorias: Categoria[] = [];
  itens: ItemCantina[] = [];
  pratoDoDia: Prato[] = [];
  selectedCategory: string = 'todos';
  isLoading = true;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;

      // Carregar categorias
      this.categorias = await this.dataService.getCategorias();

      // Carregar prato do dia
      this.pratoDoDia = await this.dataService.getPratoDoDia();

      // Carregar todos os itens inicialmente
      this.itens = await this.dataService.getTodosOsItens();
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      this.error = 'Erro ao carregar os dados. Tente novamente mais tarde.';
    } finally {
      this.isLoading = false;
    }
  }

  async filterByCategory(categoryId: string): Promise<void> {
    this.selectedCategory = categoryId;
    this.isLoading = true;

    try {
      if (categoryId === 'todos') {
        this.itens = await this.dataService.getTodosOsItens();
      } else {
        this.itens = await this.dataService.getItensPorCategoria(categoryId);
      }
    } catch (err) {
      console.error('Erro ao filtrar itens:', err);
      this.error = 'Erro ao filtrar itens. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  getCategoryName(categoryId: string): string {
    if (categoryId === 'todos') {
      return 'Todos';
    }
    const category = this.categorias.find((c) => c.id === categoryId);
    return category ? category.nome : categoryId;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }
}
