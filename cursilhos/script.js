const modal = document.getElementById('modal')
const imagemFullscreenComponent = document.getElementById('imagem-fullscreen')

const imagensPaths = ['imagens/1 MCC.jpeg', 'imagens/2 MCC.jpeg', 'imagens/3 MCC.jpeg', 'imagens/4 MCC.jpeg', 'imagens/5 MCC.jpeg', 'imagens/6 MCC.jpeg', 'imagens/7 MCC.jpeg', 
    'imagens/8 MCC.jpeg', 'imagens/9 MCC.jpeg', 'imagens/10 MCC.jpeg', 'imagens/11 MCC.jpeg', 'imagens/12 MCC.jpeg', 'imagens/13 MCC.jpeg', 'imagens/14 MCC.jpeg', 'imagens/15 MCC.jpeg',
    'imagens/16 MCC.jpeg', 'imagens/17 MCC.png', 'imagens/18 MCC.jpeg', 'imagens/19 MCC.jpg', 'imagens/20 MCC.jpg'
]

function abrirModal(imagemId) {
    if (imagemId <= imagensPaths.length) {
        imagemFullscreenComponent.src = imagensPaths[imagemId-1]
    }
}

function aumentarTamanhoImagem() {
    imagemFullscreenComponent.width += 100
}

function diminuirTamanhoImagem() {
    if (imagemFullscreenComponent.width > modal.clientWidth + 50) {
        imagemFullscreenComponent.width -= 100
    }
}