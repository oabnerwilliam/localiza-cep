# Localiza CEP

Este projeto permite consultar informações sobre um **CEP** e visualizar sua localização em um mapa interativo.

## Tecnologias Utilizadas

-   **React**: Biblioteca JavaScript para construção da interface de usuário.
-   **Axios**: Para realizar requisições HTTP à API de consulta de CEP.
-   **React-Leaflet**: Para integrar a biblioteca **Leaflet** com o React, exibindo mapas interativos.
-   **Leaflet**: Biblioteca para criação de mapas interativos.

## Funcionalidades

-   **Consulta de CEP**: O usuário pode digitar um **CEP** e obter informações detalhadas sobre o endereço (rua, bairro, cidade e estado).
-   **Exibição no Mapa**: O endereço consultado é automaticamente marcado em um mapa interativo, permitindo visualizar a localização geográfica do CEP informado.

## Como Rodar o Projeto

1.  **Clonar o Repositório**

    Clone este repositório para sua máquina local utilizando o seguinte comando:

    ```bash
    git clone [https://github.com/abner1812/localiza-cep.git](https://github.com/abner1812/localiza-cep.git)
    ```

2.  **Instalar as Dependências**

    Navegue até o diretório do projeto e instale as dependências necessárias com:

    ```bash
    npm install
    ```

3.  **Rodar o Projeto**

    Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

    O projeto estará disponível em http://localhost:3000.

## Como Funciona

1.  O usuário insere um CEP no campo de busca.
2.  A aplicação realiza uma requisição para a API de consulta de CEP (como o ViaCEP) e retorna os dados do endereço.
3.  O endereço é exibido na tela e localizado automaticamente em um mapa interativo.

## Contribuindo

1.  Faça um fork deste repositório.
2.  Crie uma branch para a sua feature ou correção.
3.  Realize o commit das suas alterações.
4.  Envie para o repositório remoto e abra um pull request.
