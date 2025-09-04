class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', favoritos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', favoritos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', favoritos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', favoritos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', favoritos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', favoritos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', favoritos: ['SKATE', 'RATO'] }
    };

    this.todosBrinquedos = new Set(
      Object.values(this.animais).flatMap(a => a.favoritos)
    );
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const p1 = this.validarBrinquedos(brinquedosPessoa1);
      const p2 = this.validarBrinquedos(brinquedosPessoa2);
      
      const animaisOrdem = this.validarAnimais(ordemAnimais);

      let adotados = { p1: [], p2: [] };
      let resultado = [];

      for (let animal of animaisOrdem) {
        const dados = this.animais[animal];
        const pode1 = this.pessoaPodeAdotar(p1, dados, adotados.p1);
        const pode2 = this.pessoaPodeAdotar(p2, dados, adotados.p2);

        let destino = 'abrigo';

        if (pode1 && pode2) {
          destino = 'abrigo';
        } 
        else if (pode1 && adotados.p1.length < 3) {
          destino = 'pessoa 1';
          adotados.p1.push(animal);
        } else if (pode2 && adotados.p2.length < 3) {
          destino = 'pessoa 2';
          adotados.p2.push(animal);
        }

        resultado.push(`${animal} - ${destino}`);
      }

      return { lista: resultado.sort((a, b) => a.localeCompare(b)) };
    } catch (error) {
      return { erro: error.message };
    }
  }

  validarBrinquedos(brinquedosStr) {
    const brinquedos = brinquedosStr.split(',').map(s => s.trim());
    
    if (new Set(brinquedos).size !== brinquedos.length) {
      throw new Error('Brinquedo inválido');
    }
    
    for (let b of brinquedos) {
      if (!this.todosBrinquedos.has(b)) {
        throw new Error('Brinquedo inválido');
      }
    }
    
    return brinquedos;
  }

  validarAnimais(animaisStr) {
    const animais = animaisStr.split(',').map(s => s.trim());
    
    if (new Set(animais).size !== animais.length) {
      throw new Error('Animal inválido');
    }
    
    for (let a of animais) {
      if (!this.animais[a]) {
        throw new Error('Animal inválido');
      }
    }
    
    return animais;
  }

  pessoaPodeAdotar(brinquedosPessoa, animal, animaisAdotados) {
    const { favoritos, tipo } = animal;
    
    if (tipo === 'jabuti') {
      return animaisAdotados.length > 0 && 
             favoritos.some(b => brinquedosPessoa.includes(b));
    }
    
    if (tipo === 'gato') {
      let idx = 0;
      for (let b of brinquedosPessoa) {
        if (b === favoritos[idx]) {
          idx++;
          if (idx === favoritos.length) return true;
        }
      }
      return false;
    }
    
    let idx = 0;
    for (let b of brinquedosPessoa) {
      if (b === favoritos[idx]) {
        idx++;
        if (idx === favoritos.length) return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
