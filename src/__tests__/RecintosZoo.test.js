import { RecintosZoo } from '../RecintosZoo';

test('Deve retornar recintos válidos para o animal Macaco', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('Macaco', 3);
    expect(resultado.sucesso).toEqual([
        'Recinto 1 (espaço livre: 4 total: 10)',
        'Recinto 2 (espaço livre: 2 total: 5)',
    ]);
});

test('Deve retornar erro para animal inválido', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('Animal_Inexistente', 3);
    expect(resultado.erro).toBe('Animal inválido');
});

test('Deve retornar erro para quantidade inválida', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('Macaco', 0);
    expect(resultado.erro).toBe('Quantidade inválida');
});

test('Deve retornar erro se não houver recintos viáveis', () => {
    const zoo = new RecintosZoo();
    const resultado = zoo.analisaRecintos('Crocodilo', 3);
    expect(resultado.erro).toBe('Não há recinto viável');
});
