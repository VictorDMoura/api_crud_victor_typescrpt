import * as readline from 'readline-sync';
import { listarFornecedores, listarProdutosComFornecedores, adicionarProduto } from './lib/funcoes';

async function main(): Promise<void> {
    let sair = false;
    while (!sair) {
        console.clear();
        const opcao = readline.questionInt('Escolha uma opção: ');

        switch (opcao) {
            case 0:
                await listarFornecedores();
                readline.question('...Pressione alguma tecla para continuar');
                break;
            case 1:
                console.clear();
                await listarProdutosComFornecedores();
                readline.question('...Pressione alguma tecla para continuar');
                break;
            case 2:
                console.clear();
                await adicionarProduto();
                readline.question('...Pressione alguma tecla para continuar');
                break;
            case 3:
                console.clear();
                await listarEditarProdutos();
                readline.question('...Pressione alguma tecla para continuar');
                break;
            case -1:
                sair = readline.keyInYN('Deseja sair da aplicação (y=sim / n=não)?');
                break;
            default:
                console.log('Opção inválida');
                break;
        }
    }
}

// EXECUÇÃO DO APLICATIVO
main();