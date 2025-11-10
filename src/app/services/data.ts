import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import PocketBase from 'pocketbase';

export interface Categoria {
  id: string;
  nome: string;
  icone?: string;
}

export interface Prato {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'principal' | 'sobremesa';
  info_nutricional?: {
    calorias: number;
    proteina: number;
    carboidratos: number;
    gordura: number;
    fibra: number;
    sodio: number;
    acucar: number;
    gordura_saturada: number;
  };
  data: string;
  disponivel: boolean;
}

export interface ItemCantina {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string; // ID da categoria
  disponivel: boolean;
}

export interface Avaliacao {
  id: string;
  prato: string; // ID do prato
  aluno: string; // ID do aluno
  nota: number; // 1-5
  comentario: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private pb: PocketBase;

  constructor(private authService: AuthService) {
    this.pb = this.authService.getPocketBase();
  }

  /**
   * Obtém o prato do dia (principal + sobremesa)
   */
  async getPratoDoDia(): Promise<Prato[]> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const pratos = await this.pb.collection('pratos').getFullList<Prato>({
        filter: `data = "${today}" && disponivel = true`,
      });
      return pratos;
    } catch (error) {
      console.error('Erro ao buscar prato do dia:', error);
      return [];
    }
  }

  /**
   * Obtém todas as categorias
   */
  async getCategorias(): Promise<Categoria[]> {
    try {
      const categorias = await this.pb.collection('categorias').getFullList<Categoria>();
      return categorias;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  /**
   * Obtém itens da cantina por categoria
   */
  async getItensPorCategoria(categoriaId: string): Promise<ItemCantina[]> {
    try {
      if (categoriaId === 'todos') {
        // Retornar todos os itens disponíveis
        const itens = await this.pb.collection('itens_cantina').getFullList<ItemCantina>({
          filter: 'disponivel = true',
        });
        return itens;
      } else {
        // Retornar itens de uma categoria específica
        const itens = await this.pb.collection('itens_cantina').getFullList<ItemCantina>({
          filter: `categoria = "${categoriaId}" && disponivel = true`,
        });
        return itens;
      }
    } catch (error) {
      console.error('Erro ao buscar itens por categoria:', error);
      return [];
    }
  }

  /**
   * Obtém todos os itens disponíveis
   */
  async getTodosOsItens(): Promise<ItemCantina[]> {
    try {
      const itens = await this.pb.collection('itens_cantina').getFullList<ItemCantina>({
        filter: 'disponivel = true',
      });
      return itens;
    } catch (error) {
      console.error('Erro ao buscar todos os itens:', error);
      return [];
    }
  }

  /**
   * Obtém informações nutricionais de um prato
   */
  async getDetalhesNutricionais(pratoId: string): Promise<Prato | null> {
    try {
      const prato = await this.pb.collection('pratos').getOne<Prato>(pratoId);
      return prato;
    } catch (error) {
      console.error('Erro ao buscar detalhes nutricionais:', error);
      return null;
    }
  }

  /**
   * Cria uma nova avaliação
   */
  async criarAvaliacao(avaliacao: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    try {
      const novaAvaliacao = await this.pb.collection('avaliacoes').create<Avaliacao>(avaliacao);
      return novaAvaliacao;
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  }

  /**
   * Obtém avaliações de um prato
   */
  async getAvaliacoesDoPrato(pratoId: string): Promise<Avaliacao[]> {
    try {
      const avaliacoes = await this.pb.collection('avaliacoes').getFullList<Avaliacao>({
        filter: `prato = "${pratoId}"`,
      });
      return avaliacoes;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      return [];
    }
  }

  /**
   * Adiciona um novo item à cantina (apenas admin)
   */
  async adicionarItem(item: Omit<ItemCantina, 'id'>): Promise<ItemCantina> {
    try {
      const novoItem = await this.pb.collection('itens_cantina').create<ItemCantina>(item);
      return novoItem;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  }

  /**
   * Remove um item da cantina (apenas admin)
   */
  async removerItem(itemId: string): Promise<void> {
    try {
      await this.pb.collection('itens_cantina').delete(itemId);
    } catch (error) {
      console.error('Erro ao remover item:', error);
      throw error;
    }
  }

  /**
   * Atualiza a disponibilidade de um item (apenas admin)
   */
  async atualizarDisponibilidade(itemId: string, disponivel: boolean): Promise<ItemCantina> {
    try {
      const itemAtualizado = await this.pb.collection('itens_cantina').update<ItemCantina>(itemId, {
        disponivel,
      });
      return itemAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os itens (incluindo indisponíveis) - apenas admin
   */
  async getTodosOsItensAdmin(): Promise<ItemCantina[]> {
    try {
      const itens = await this.pb.collection('itens_cantina').getFullList<ItemCantina>();
      return itens;
    } catch (error) {
      console.error('Erro ao buscar todos os itens:', error);
      return [];
    }
  }
}
