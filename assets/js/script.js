// Animação de mudança de form
/*const btnMsg1 = document.querySelector('.botao-mensagem1')
const btnMsg2 = document.querySelector('.botao-mensagem2')
const container = document.querySelector('.mainContent')
const alternar = localStorage.getItem('toggle')

if (alternar === 'ativo') {
    container.classList.add('active')
    container.classList.remove('unactive')
}

btnMsg1.addEventListener('click', mostrarForm1)
btnMsg2.addEventListener('click', mostrarForm2)

function mostrarForm1() {
    container.classList.remove('active')
    container.classList.add('unactive')
    localStorage.setItem('toggle', null)
}

function mostrarForm2() {
    container.classList.add('active')
    container.classList.remove('unactive')
    localStorage.setItem('toggle', 'ativo')
}*/

//Digitar CEP
const btnDigitarCEP = document.querySelector('.botao-mensagem2')
btnDigitarCEP.addEventListener('click', ()=>{
    cep.focus()
})

// Modo Escuro
let darkmode = localStorage.getItem('darkmode')
const btnDark = document.querySelector('.botaoDark')

if (darkmode === 'active') {
    document.body.classList.add('darkmode')
}

btnDark.addEventListener('click', modoEscuro)

function ativarModoEscuro() {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

function desativarModoEscuro() {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

function modoEscuro() {
    darkmode = localStorage.getItem('darkmode')
    darkmode === 'active' ? desativarModoEscuro() : ativarModoEscuro()
}

// Mapa com OpenLayers
const btnMapa = document.querySelector('.botao-mapa')
let containerMapa
let map

function inicializarMapa() {
    if (!containerMapa) {
        containerMapa = document.createElement('div');
        containerMapa.setAttribute('id', 'mapa');
        containerMapa.style.display = 'none'
        document.querySelector('.alternar').appendChild(containerMapa);

        map = new ol.Map({
            target: 'mapa',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([0, 0]),
                zoom: 2,
            }),
        });
    }
}

btnMapa.addEventListener('click', () => {
    containerMapa.style.display = 'block'
})

// Busca de endereço e coordenadas por CEP
const cep = document.querySelector('.cep')
const endereco = document.querySelector('.endereco')
const estado = document.querySelector('.estado')
const cidade = document.querySelector('.cidade')
const bairro = document.querySelector('.bairro')
const divCep = document.querySelector('.divCep')

cep.addEventListener('focusout', async () => {
    try {
        console.log("CEP informado:", cep.value) // Log para depuração
        const onlyNumbers = /^[0-9\-]+$/
        const cepValid = /^[0-9]{5}-?[0-9]{3}$/

        if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
            throw { cep_error: 'CEP inválido' }
        }

        const resposta = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        if (!resposta.ok) {
            throw await resposta.json()
        }

        const respostaCep = await resposta.json()

        if (respostaCep.erro) {
            throw { cep_error: 'CEP não encontrado' }
        }

        endereco.value = respostaCep.logradouro || ''
        estado.value = respostaCep.uf || ''
        cidade.value = respostaCep.localidade || ''
        bairro.value = respostaCep.bairro || ''

        // Busca coordenadas no Nominatim
        const geoResposta = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cep.value}&country=Brazil&format=json`)
        const geoDados = await geoResposta.json()
        console.log("Coordenadas retornadas:", geoDados)

        inicializarMapa()

        if (geoDados.length > 0) {
            const { lat, lon } = geoDados[0]
            atualizarMapa(lat, lon)
        } else {
            throw { geo_error: 'Não foi possível encontrar coordenadas para este CEP' }
        }
    } catch (error) {
        console.error("Erro na busca do CEP:", error)
        const mensagem = document.createElement('span')
        mensagem.classList.add('mensagemErro')
        mensagem.innerHTML = `&#9888 ERRO! ${error.cep_error || error.geo_error}`
        divCep.appendChild(mensagem)
        setTimeout(() => mensagem.remove(), 3000)
    }
})

function atualizarMapa(lat, lon) {
    if (!map) {
        console.error('Mapa ainda não foi inicializado.');
        alert('Por favor, abra o mapa antes de buscar o CEP.');
        return;
    }

    console.log(`Atualizando mapa para: lat=${lat}, lon=${lon}`);

    // Atualiza a visualização do mapa com as coordenadas fornecidas
    const view = map.getView();
    const coordenadas = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);
    view.setCenter(coordenadas);
    view.setZoom(16);

    // Remove marcadores antigos
    map.getOverlays().clear();

    // Adiciona um novo marcador
    const markerElement = document.createElement('div');
    markerElement.className = 'marker';

    const marker = new ol.Overlay({
        position: coordenadas,
        positioning: 'center-center',
        element: markerElement,
        stopEvent: false,
    });

    map.addOverlay(marker);
    console.log('Marcador adicionado ao mapa.');
}

//Formatação de Texto
var cleave = new Cleave('.cep', {
    delimiter: '-',
    blocks: [5, 3],
});