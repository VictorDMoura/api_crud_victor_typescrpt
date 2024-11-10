import * as readlineSync from 'readline-sync';
// Importação das Funções CRUD
import { listarFornecedores, listarProdutosComFornecedores, adicionarProduto, listarEditarProdutos } from './lib/funcoes';

const opcoesMenu: string[] = [
    'Listar Fornecedores',
    'Listar Produtos com Fornecedores',
    'Cadastrar Produto',
    'Listar/Editar Produtos',
];

async function main(): Promise<void> {
    let sair = false;
    while (!sair) {
        console.clear();
        console.log('---------------------------------------');
        console.log(' BEM VIDO AO CONTROLE DE ESTOQUE ');
        console.log(' MENU DE OPÇÕES ');
        console.log('---------------------------------------');
        const opcao = readlineSync.keyInSelect(opcoesMenu, 'Digite a opção: ', { cancel: 'Sair' });

        switch (opcao) {
            case 0:
                console.clear();
                await listarFornecedores();
                readlineSync.question('...Pressione alguma tecla para continuar');
                break;
            case 1:
                console.clear();
                await listarProdutosComFornecedores();
                readlineSync.question('...Pressione alguma tecla para continuar');
                break;
            case 2:
                console.clear();
                await adicionarProduto();
                readlineSync.question('...Pressione alguma tecla para continuar');
                break;
            case 3:
                console.clear();
                await listarEditarProdutos();
                readlineSync.question('...Pressione alguma tecla para continuar');
                break;
            case -1:
                sair = readlineSync.keyInYN('Deseja sair da aplicação (y=sim / n=não)?') ? true : false;
                break;
            default:
                break;
        }
    }
}

// EXECUÇÃO DO APLICATIVO
main().catch(console.error);