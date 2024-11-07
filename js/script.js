document.addEventListener('DOMContentLoaded', () => {
    const pessoa = document.querySelector('.pessoa');
    const quadrado = document.querySelector('.quadrado');

    const jump = () => {
        pessoa.classList.add('jump');

        setTimeout(() => {
            pessoa.classList.remove('jump');
        }, 500);
    }

    const loop = setInterval(() => {
        const quadradoPosition = quadrado.offsetLeft;
        pessoaPosition = +window.getComputedStyle(pessoa).bottom.replace('px', '');

        if (quadradoPosition < 120 && quadradoPosition > 0
            && pessoaPosition < 80){

            quadrado.style.animation = 'none'
            quadrado.style.left = `${quadradoPosition}px`;

            pessoa.style.animation = 'none'
            pessoa.style.bottom = `${pessoaPosition}px`;

            pessoa.src = 'tumulo.png';
            pessoa.style.width = '120px'

            clearInterval(loop);




        }
        
    }, 10);

    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
});
