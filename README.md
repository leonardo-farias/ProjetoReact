O objetivo é construir uma aplicação que simula o envio de dinheiro para uma outra pessoa, via cartão de crédito.

Fluxo das telas
Na primeira tela terá uma listagem de usuários, onde a pessoa pode clicar em algum usuário da lista para realizar o pagamento. Quando clicado em um usuário é então aberto um modal de pagamento, contendo as informações do usuário de destino, a opção de selecionar um cartão de crédito e um botão de pagar. O usuário deve então digitar o valor, escolher o cartão e clicar em pagar. Para realização do pagamento deve-se chamar um endpoint de pagamento que aprovará/recusará a transação. E então deve-se mostrar na tela o modal de pagamento concluído com sucesso ou o de erro.

Cartões para exibir
O cartão válido vai aprovar a transação no backend;

let cards = [
  // valid card
  {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  },
  // invalid card
  {
    card_number: '4111111111111234',
    cvv: 123,
    expiry_date: '01/20',
  },
];

Transação
Endpoint: https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989

Método: POST

// Payload:

interface TransactionPayload {
  // Card Info
  card_number: string;
  cvv: number;
  expiry_date: string;

  // Destination User ID
  destination_user_id: number;

  // Value of the Transaction
  value: number;
}
Obs: Por se tratar de um mock o endpoint sempre retornará o mesmo payload, sucesso no pagamento, independente do cartão

Usuários
Endpoint: https://www.mocky.io/v2/5d531c4f2e0000620081ddce

Método: GET

// Payload:

interface User {
  id: number;
  name: string;
  img: string;
  username: string;
}