document.addEventListener('DOMContentLoaded', () => {
    const pessoa = document.querySelector('.pessoa');
    const quadrado = document.querySelector('.quadrado');

    let isJumping = false;  // Variável para verificar se o boneco está pulando
    let isDead = false;  // Variável para verificar se o boneco morreu

    const jump = () => {
        if (isJumping || isDead) return; // Não permite pular se o boneco já está no ar ou morto
        isJumping = true;  // Marca que o boneco está pulando

        pessoa.classList.add('jump');  // Inicia a animação de pulo

        // Depois que o pulo terminar, o boneco volta ao chão
        setTimeout(() => {
            pessoa.classList.remove('jump');
            isJumping = false;  // Marca que o boneco não está mais pulando
        }, 700);  // O tempo do pulo (700ms)
    }

    // Loop para verificar colisões enquanto o quadrado se move
    const loop = setInterval(() => {
        if (isJumping || isDead) return;  // Não verifica colisão enquanto o boneco está pulando ou morto

        const quadradoPosition = quadrado.offsetLeft;
        const pessoaPosition = +window.getComputedStyle(pessoa).bottom.replace('px', '');

        // Verifica se o quadrado está na posição de colisão e o boneco está no chão
        if (quadradoPosition < 120 && quadradoPosition > 0 && pessoaPosition <= 80) {
            isDead = true;  // Marca que o boneco morreu
            quadrado.style.animation = 'none';
            quadrado.style.left = `${quadradoPosition}px`;  // Mantém a posição atual do quadrado

            pessoa.style.animation = 'none';
            pessoa.style.bottom = `${pessoaPosition}px`;  // Mantém a posição atual do boneco

            pessoa.src = 'tumulo.png';  // Muda o sprite do boneco para o tumulo (morte)
            pessoa.style.width = '120px';  // Ajusta o tamanho do boneco

            clearInterval(loop);  // Para o loop de colisão
        }

    }, 10);

    // Adiciona os eventos de teclado e toque para iniciar o pulo
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();  // Previne o comportamento padrão do toque
        jump();
    });
});

