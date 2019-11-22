var enderecoContrato = "0x9b9625bD99E2a338FB82328E21eAF785452e724c";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function registrarMudancaStatus() {
    var textoCampo = document.frmStatus.txtStatusPagamentoAluguel.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusPagamento(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);   
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })        
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        })
    }
    function fimDoContrato() {
        var textoCampo = document.frmFim.txtFimDoContrato.value;
        var caixafimTx = document.getElementById("caixaFimTx");
        if (textoCampo.length === 3) {
            caixaFimTx.innerHTML = "Enviando transação...";
            contrato.fimDoContrato(textoCampo)
            .then( (transacao) => {
                console.log("registrarFimDoContrato - Transacao ", transacao);   
                caixaFimTx.innerHTML = "Transação enviada. Aguardando processamento...";
                transacao.wait()
                .then( (resultado) => {
                    buscaFimContrato();
                    caixaStatusTx.innerHTML = "Transação realizada.";
                })        
                .catch( (err) => {
                    console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                    console.error(err);
                    caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
                })
            })
            .catch( (err) => {
                console.error("registrarFimContrato");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            })
        }
}

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");     
    contrato.statusPagamentoAluguel()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });
}