export class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'Macaco', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'Gazela', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'Leão', quantidade: 1 }] },
      ];
  
      this.animais = {
        Leão: { tamanho: 3, bioma: ['savana'], carnívoro: true },
        Leopardo: { tamanho: 2, bioma: ['savana'], carnívoro: true },
        Crocodilo: { tamanho: 3, bioma: ['rio'], carnívoro: true },
        Macaco: { tamanho: 1, bioma: ['savana', 'floresta'], carnívoro: false },
        Gazela: { tamanho: 2, bioma: ['savana'], carnívoro: false },
        Hipopotamo: { tamanho: 4, bioma: ['savana', 'rio'], carnívoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      const animalInfo = this.animais[animal];
      
      if (!animalInfo) {
        return { erro: 'Animal inválido' };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
  
      const recintosViáveis = [];
  
      
      if (animal === 'Macaco' && quantidade >= 10) {
        const recintoFloresta = this.recintos.find(recinto => recinto.bioma === 'floresta');
        if (recintoFloresta) {
          const espaçoTotal = recintoFloresta.tamanho;
          const espaçoOcupado = recintoFloresta.animais.reduce((acc, animalExistente) => {
            return acc + animalExistente.quantidade * this.animais[animalExistente.especie].tamanho;
          }, 0);
          const espaçoLivre = espaçoTotal - espaçoOcupado - quantidade * animalInfo.tamanho;
  
          if (espaçoLivre >= 0) {
            return { recintosViáveis: [`Recinto ${recintoFloresta.numero} (espaço livre: ${espaçoLivre} total: ${espaçoTotal})`], novoAnimal: animal };
          } else {
            return { erro: 'Não há espaço suficiente na Floresta para 10 macacos' };
          }
        } else {
          return { erro: 'Não há recinto com o bioma Floresta' };
        }
      }
  
      
      this.recintos.forEach(recinto => {
        const espaçoTotal = recinto.tamanho;
        const espaçoOcupado = recinto.animais.reduce((acc, animalExistente) => {
          return acc + animalExistente.quantidade * this.animais[animalExistente.especie].tamanho;
        }, 0);
        let espaçoLivre = espaçoTotal - espaçoOcupado;
        const espaçoNecessario = animalInfo.tamanho * quantidade;
  
        if (recinto.animais.length > 0) {
          const especiesNoRecinto = recinto.animais.map(a => a.especie);
          const outrosCarnivoros = especiesNoRecinto.some(especie => this.animais[especie].carnívoro);
          const misturaInviável =
            (animalInfo.carnívoro && recinto.animais.length > 0) ||
            (outrosCarnivoros && !animalInfo.carnívoro) ||
            (animal === 'Hipopotamo' && recinto.bioma !== 'savana e rio') ||
            (especiesNoRecinto.includes('Hipopotamo') && recinto.bioma !== 'savana e rio');
  
          if (misturaInviável) return;
  
          espaçoLivre -= recinto.animais.length > 1 ? 1 : 0;
  
          if (animal === 'Macaco' && recinto.animais.length === 0) {
            espaçoNecessario += 1;
          }
        }
  
        if (animalInfo.bioma.includes(recinto.bioma) && espaçoLivre >= espaçoNecessario) {
          recintosViáveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${espaçoLivre - espaçoNecessario} total: ${espaçoTotal})`
          );
        }
      });
  
      return recintosViáveis.length > 0
        ? { sucesso: recintosViáveis.sort((a, b) => a.localeCompare(b)) }
        : { erro: 'Não há recinto viável' };
    }
}
  