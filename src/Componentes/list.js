import React, {useEffect, useState} from "react"
import axios from 'axios'
import NumberFormat from 'react-number-format';
import "./list.css"


export default function List() {

    const [requiredCamp, setRequiredCamp] = useState("none"); // Constante para validação de campo
    let [usuarios, setUsuarios] = useState([])  /* colocar array vazia como valor inicial para poder listar depois   */
    let [showModal, setShowModal] = useState(false)
    let [usuarioSelecionado, setUsuarioSelecionado] = useState({}) // usar {} pois o conteúdo está em json
    let [cartaoSelecionado, setCartaoSelecionado] = useState()
    let [valorTransacao, setValorTransacao] = useState()
    let [showModalResult, setShowModalResult] = useState(false)
    let [confirmacaoPagamento, setConfirmacaoPagamento] = useState()

    let [cartao] = useState([
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
    ]) 
    

    useEffect(() => {
        // a url http://cors.bridged.cc/ serve para evitar erros de cors utilizando axios
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {

        }).then((resp) => {
            setUsuarios(resp.data)
            console.log(usuarios)
        })

    }, [])

    let mostrarModal = (u) => {
        console.log(u);
        setUsuarioSelecionado(u);

        setShowModal(true);
    }
    
    let fecharModal = () => {

        setShowModal(false);
    }

     // Função para filtrar o valor do dinheiro
    function inputChange(e){
        setValorTransacao(e.target.value);
        setRequiredCamp("none");
    }

    // Função para detectar modificação e resgatar valor no selection
    function handleChange(event){
        setCartaoSelecionado(event.target.value);
    }

     // Abrir o modal de recibo de pagamento
     function modalPagamento (){
         console.log("cartão " + cartaoSelecionado)
        if (cartaoSelecionado === cartao[0].card_number/*  || "Cartão com o final 1111" */){
            setShowModal(false);
            
            setShowModalResult(true);
            setConfirmacaoPagamento("");
        } else if (cartaoSelecionado === cartao[1].card_number/*  || "Cartão com o final 1234" */){
            setShowModal(false);

            setShowModalResult(true);
            setConfirmacaoPagamento("não");
        }
        
    }

    function fecharModalPagamento (){

        setShowModalResult(false)
    }
    

    return(
        <>
        <div>
            <div class="backdrop" style={{display: (showModal ? "block" : "none")}} onClick={() => setShowModal(false)}></div>
                <div class="modal" style={{display: (showModal ? "block" : "none")}}>
                    <div class="headerModal">
                        <div class="identificacaoModal">
                            <span class="tituloModal">Pagamento para </span>    
                            <span class="usuarioModal">{usuarioSelecionado.name} </span>
                        </div>
                        <div class="fechaModal" onClick={fecharModal}>X</div>
                    </div>   
                    <div class="bodyModal">
                        <div className="input-money">
                            <NumberFormat thousandSeparator={true} value={valorTransacao} onChange={inputChange} prefix={'R$ '} inputmode="numeric" placeholder="R$ 0,00" class="valor"/>
                            <p style={{display:requiredCamp}}>Campo obrigatório</p>
                         </div>
                         {/* <select  placeholder="Selecione o cartao" value={setCartaoSelecionado}  onChange={handleChange}>
                            {cartao.map(
                                cartao => (
                                    <option value={setCartaoSelecionado} key={cartao.id}>
                                        Cartão com o final {cartao.card_number.substr(-4)}
                                    </option>
                                )
                            )}
                        </select> */}
                        <select onChange={handleChange} class="cartoes">
                            <option value="Selecione o cartao">Selecione o cartao</option>
                            <option value={cartao[0].card_number}>Cartão com final {cartao[0].card_number.substr(-4)}</option>
                            <option value={cartao[1].card_number}>Cartão com final {cartao[1].card_number.substr(-4)}</option>

                        </select>
                        <button class="botaoPagarModal" onClick={() => {modalPagamento()}}>Pagar</button>
                    </div>
                </div>

            </div>
            <div class="listaUsuario">
                {usuarios.map((u, index)=>{
                    return( 
                        <div class="campoUsuario">
                        <div class="informacoesUsuario" key={"nome"+index}>
                        <img class="imagem" src={u.img}></img>
                        <ul>
                            <li class="name">{u.name}</li>
                            <li class="id">ID: {u.id} - Username: {u.username}</li>
                        </ul>
                        </div>
                            <button onClick={(e) => mostrarModal (u) } class="botaoPagar">Pagar</button>
                        </div>
                    )
                })}
            </div>
            <div class="backdrop" style={{display: (showModalResult ? "block" : "none")}} onClick={() => setShowModalResult(false)}></div>
            <div class="modalPagamento" style={{display: (showModalResult ? "block" : "none")}} onClick={() => setShowModalResult(false)}>
                <div class="headerModalPagamento">
                    <span class="reciboPagamento">Recibo de pagamento</span>
                    <div class="fechaModalPagamento" onClick={fecharModalPagamento}>X</div>
                </div>
                <div class="mensagemRecibo">
                    <span>O pagamento <b class="resultRecibo">{confirmacaoPagamento}</b> foi concluido com sucesso</span>
                </div>
            </div>
        
        </>
    )
    
}

