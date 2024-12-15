let slideIndex = 0; // Inicializando o índice do slide
let slideInterval; // Variável para armazenar o intervalo do slide automático
let progressIntervals = [null, null, null]; // Armazena os intervalos de cada barra

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

    // Inicia o preenchimento da barra correspondente
    startProgressBar(slideIndex);
}

// Função para iniciar o preenchimento das barras de progresso
function startProgressBar(slideIndex) {
    // Para qualquer intervalo de progresso anterior
    clearInterval(progressIntervals[slideIndex]);

    // Reseta todas as barras
    resetProgressBars();

    // Inicia o preenchimento da barra para o slide atual
    let width = 0;
    const progressBar = document.getElementById(`bar-${slideIndex + 1}`);
    
    // Preenche a barra de progresso ao longo de 5 segundos (tempo do slide)
    progressIntervals[slideIndex] = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressIntervals[slideIndex]); // Para o preenchimento quando atingir 100%
        } else {
            width++; // Aumenta o preenchimento da barra
            progressBar.style.width = width + '%'; // Atualiza a largura da barra
        }
    }, 50); // Intervalo de 50ms para a atualização da barra
}

// Função para resetar as barras de progresso
function resetProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Reseta todas as barras para 0%
    progressBars.forEach(bar => bar.style.width = '0%');
    
    // Para qualquer intervalo anterior de preenchimento
    progressIntervals.forEach(interval => clearInterval(interval));
}

// Função para iniciar a troca automática de slides
function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1); // Mover para o próximo slide automaticamente
    }, 5000); // Trocar de slide a cada 5 segundos (5000ms)
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
