document.addEventListener('DOMContentLoaded', () => {
    const pessoa = document.querySelector('.pessoa');
    const quadrado = document.querySelector('.quadrado');
    const timerElement = document.getElementById('timer');  // Referência para o cronômetro

    let isJumping = false;  // Variável para verificar se o boneco está pulando
    let isDead = false;  // Variável para verificar se o boneco morreu
    let timer = 0;  // Variável para o tempo
    let timerInterval = null;  // Armazena o ID do intervalo

    // Função para iniciar o pulo
    const jump = () => {
        if (isJumping || isDead) return; // Não permite pular se o boneco já está no ar ou morto
        isJumping = true;  // Marca que o boneco está pulando

        pessoa.classList.add('jump');  // Inicia a animação de pulo

        // Depois que o pulo terminar, o boneco volta ao chão
        setTimeout(() => {
            pessoa.classList.remove('jump');
            isJumping = false;  // Marca que o boneco não está mais pulando
        }, 700);  // O tempo do pulo (700ms)
    };

    // Função para iniciar o cronômetro
    const startTimer = () => {
        // Inicia o intervalo do cronômetro
        timerInterval = setInterval(() => {
            timer++;  // Incrementa o tempo a cada segundo
            timerElement.textContent = `Tempo: ${timer}s`;  // Atualiza a exibição do cronômetro
        }, 1000);  // 1 segundo
    };

    // Função para parar o cronômetro
    const stopTimer = () => {
        clearInterval(timerInterval);  // Para o cronômetro
    };

    // Função para reiniciar o cronômetro
    const resetTimer = () => {
        clearInterval(timerInterval);  // Limpa o intervalo
        timer = 0;  // Reseta o tempo para 0
        timerElement.textContent = `Tempo: 0s`;  // Reseta o display
    };

    // Função para restaurar o personagem ao estado inicial
    const restorePerson = () => {
        pessoa.src = 'pessoa.webp';  // Restaura a imagem original do personagem
        pessoa.style.width = '100px';  // Ajusta o tamanho do personagem (se necessário)
        pessoa.style.bottom = '0px';  // Coloca o personagem de volta no chão
        pessoa.style.animation = '';  // Remove qualquer animação anterior
    };

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

            pessoa.src = 'tumulo.png';  // Muda o sprite do boneco para o túmulo (morte)
            pessoa.style.width = '120px';  // Ajusta o tamanho do boneco

            clearInterval(loop);  // Para o loop de colisão
            stopTimer();  // Para o cronômetro

            alert(`Fim de Jogo! Seu tempo foi: ${timer}s`);  // Exibe o tempo final
        }

    }, 10);

    // Adiciona os eventos de teclado e toque para iniciar o pulo
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();  // Previne o comportamento padrão do toque
        jump();
    });

    // Iniciar o jogo
    const startGame = () => {
        if (isDead) return;  // Não inicia o jogo novamente se o personagem morreu

        resetTimer();  // Reseta o cronômetro antes de iniciar o jogo
        restorePerson();  // Restaura a imagem e o estado do personagem
        startTimer();  // Inicia o cronômetro

        // Reinicia o quadrado e a pessoa para o início do jogo
        quadrado.style.animation = 'game 1.5s infinite linear';  // Reinicia a animação do quadrado

        // Definir o loop de colisão
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

                pessoa.src = 'tumulo.png';  // Muda o sprite do boneco para o túmulo (morte)
                pessoa.style.width = '120px';  // Ajusta o tamanho do boneco

                clearInterval(loop);  // Para o loop de colisão
                stopTimer();  // Para o cronômetro
                alert(`Fim de Jogo! Seu tempo foi: ${timer}s`);  // Exibe o tempo final
            }

        }, 10);
    };

    // Iniciar o jogo
    startGame();
});

 
