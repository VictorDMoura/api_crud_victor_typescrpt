import * as input from 'readline-sync';
import axios from 'axios';
import {Produto} from '../classes/produto';
import {Fornecedor} from '../classes/fornecedor';


async function listarFornecedores(): Promise<void> {
    console.log('------------------------------');
    console.log(' FORNECEDORES');
    console.log('------------------------------');
    console.log('ID NOME');
    console.log('------------------------------');
    try {
        const result = await axios.get<Fornecedor[]>('http://localhost:3000/fornecedores');
        result.data.forEach(({ id, nome }) => console.log(id + '-' + nome));
        console.log('------------------------------');
    } catch (error) {
        console.log('ERRO: ' + error);
    }
}

async function listarProdutosComFornecedores(): Promise<void> {
    console.log('--------------------------------------------');
    console.log(' PRODUTOS COM FORNECEDORES');
    console.log('--------------------------------------------');
    console.log(' PRODUTO');
    console.log('ID - NOME (NOME FORNECEDOR)');
    console.log('--------------------------------------------');
    try {
        const [produtosResult, fornecedoresResult] = await Promise.all([
            axios.get('http://localhost:3000/produtos'),
            axios.get('http://localhost:3000/fornecedores')
        ]);

        const produtos: Produto[] = produtosResult.data as Produto[];
        const fornecedores: Fornecedor[] = fornecedoresResult.data as Fornecedor[];

        const produtosComFornecedor = produtos.map((elemProduto) => ({
            ...elemProduto,
            nomeForn: fornecedores.find((elemForn: Fornecedor) => elemForn.id === elemProduto._idFornFK)?.nome || 'Fornecedor não encontrado'
        }));

        produtosComFornecedor.forEach((elemento) => {
            console.log(`${(elemento as Produto).id} - ${elemento.nome} (${elemento.nomeForn})`);
        });
        console.log('--------------------------------------------');
    } catch (error) {
        console.log('ERRO: ' + error);
    }
}

async function adicionarProduto(): Promise<void> {
    const produto: Produto = {} as Produto;
    produto.nome = input.question('Digite o nome do produto: ');
    produto.qtdeEstoque = Number(input.question('Digite a quantidade em estoque: '));
    produto.preco = parseFloat(input.question('Digite o preço: '));
    try {
        const result = await axios.get('http://localhost:3000/fornecedores');
        const vetFornecedores = (result.data as Fornecedor[]).map((elemForn: Fornecedor) => elemForn.nome);
        console.log('Selecione abaixo o fornecedor para o produto:');
        const opcao = input.keyInSelect(vetFornecedores, 'Digite a opção', { cancel: 'null' });

        produto._idFornFK = opcao >= 0 ? (result.data as Fornecedor[])[opcao].id : null;
        console.log(`Fornecedor selecionado: ${produto._idFornFK}${produto._idFornFK ? '-' + vetFornecedores[opcao] : ''}`);

        const postResult = await axios.post('http://localhost:3000/produtos', produto);
        console.log((postResult.data as { message: string }).message);
    } catch (error) {
        console.log('ERRO: ' + error);
    }
}

async function listarEditarProdutos(): Promise<void> {
    console.log('Selecione abaixo o produto para Alterar/Excluir:');
    try {
        let opcao: number, produtoId: number | null = null, produto: Produto | null = null;
        const result = await axios.get('http://localhost:3000/produtos');
        const vetProdutos = (result.data as Produto[]).map(({ id, nome }) => `-> ${id} - ${nome}`);

        console.log('----------------------------------');
        console.log(' PRODUTOS');
        console.log('----------------------------------');
        console.log('[ ] ID NOME');
        console.log('----------------------------------');
        opcao = input.keyInSelect(vetProdutos, 'Digite a opção: ', { cancel: 'Sair' });

        if (opcao !== -1) { // -1 -> Sair
            produtoId = (result.data as Produto[])[opcao].id;
            console.clear();
            const produtoResult = await axios.get(`http://localhost:3000/produtos/${produtoId}`);
            produto = produtoResult.data as Produto;

            console.log('-----------------------------------');
            console.log(' DETALHE DO PRODUTO');
            console.log('-----------------------------------');
            console.log(`ID: ${produto?.id}`);
            console.log(`NOME: ${produto?.nome}`);
            console.log(`QTDE: ${produto?.qtdeEstoque} PREÇO: ${produto?.preco} ID_FORN: ${produto?._idFornFK}`);
            console.log('-----------------------------------');

            opcao = input.keyInSelect(['Alterar', 'Excluir'], 'Digite a opção: ', { cancel: 'Sair' });

            switch (opcao) {
                case 0:
                    produto.nome = input.question('NOME: ');
                    produto.qtdeEstoque = Number(input.question('QTDE ESTOQUE: '));
                    produto.preco = Number(input.question('PREÇO: '));
                    produto._idFornFK = Number(input.question('ID FORNECEDOR: '));
                    const putResult = await axios.put("http://localhost:3000/produtos", produto);
                    console.log((putResult.data as { message: string }).message);
                    break;
                case 1:
                    const excluir = input.keyInYN(`Deseja excluir o produto "${produto!.id}-${produto!.nome}" (y=sim / n=não)?`);
                    if (excluir) {
                        const deleteResult = await axios.delete(`http://localhost:3000/produtos/${produto.id}`);
                        console.log((deleteResult.data as { message: string }).message);
                    }
                    break;
                case -1:
                    console.log('Operação de "Alteração/Exclusão" CANCELADA!');
                    break;
            }
        } else {
            console.log('Operação de "Alteração/Exclusão" CANCELADA!');
        }
    } catch (error) {
        console.log('ERRO: ' + error);
    }
}

export {
    listarFornecedores,
    listarProdutosComFornecedores,
    adicionarProduto,
    listarEditarProdutos
};