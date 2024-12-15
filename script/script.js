let slideIndex = 0; // Inicializando o índice do slide
let slideInterval; // Variável para armazenar o intervalo do slide automático
let progressInterval; // Variável para controlar o progresso da barra

// Função para mover o slide
function moveSlide(direction) {
    const slides = document.querySelectorAll('.banner-slides img');
    const totalSlides = slides.length;

    slideIndex += direction; // Alterar o índice de acordo com a direção

    // Verifica se o índice ultrapassou os limites e o ajusta
    if (slideIndex >= totalSlides) {
        slideIndex = 0; // Vai para o primeiro slide
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1; // Vai para o último slide
    }

    // Move o container de imagens
    const slidesContainer = document.querySelector('.banner-slides');
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`; // Desloca as imagens

    // Reinicia a barra de progresso
    resetProgressBar();

    // Atualiza o tempo da barra de progresso
    updateProgressBar();

    // Atualiza a barra de progresso
    updateProgressBar();
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    let width = 0; // Inicializa o valor de preenchimento da barra

    // Define o intervalo para preencher a barra ao longo de 5 segundos (tempo do slide)
    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval); // Para o preenchimento quando atingir 100%
        } else {
            width++; // Aumenta o preenchimento da barra
            progressBar.style.width = width + '%'; // Atualiza a largura da barra
        }
    }, 100); // Intervalo de 50ms para a atualização da barra
}

// Função para reiniciar a barra de progresso
function resetProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = '0%'; // Reinicia a barra para 0%
    clearInterval(progressInterval); // Para qualquer intervalo anterior
}

// Função para iniciar a troca automática de slides
function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1); // Mover para o próximo slide automaticamente
    }, 10000); // Trocar de slide a cada 5 segundos (5000ms)
}

// Função para parar o slide automático quando o usuário interagir (opcional)
function stopAutoSlide() {
    clearInterval(slideInterval); // Para a troca automática ao interagir
}

// Inicializa a navegação no primeiro slide
document.addEventListener("DOMContentLoaded", function() {
    moveSlide(0); // Começa com o primeiro slide visível
    startAutoSlide(); // Inicia o slide automático
});
