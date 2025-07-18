// Usamos o modo estrito para um código mais seguro e robusto
'use strict';

// O componente principal da nossa aplicação React
function App() {
    // Estado para guardar a posição do botão "Não". Inicialmente 'auto'.
    const [noButtonPosition, setNoButtonPosition] = React.useState({
        top: 'auto',
        left: 'auto',
    });

    // Estado para controlar a visibilidade da mensagem final. Inicialmente, não é visível.
    const [messageVisible, setMessageVisible] = React.useState(false);

    // Estado para controlar a visibilidade dos botões.
    const [buttonsVisible, setButtonsVisible] = React.useState(true);

    // Referência para o elemento do contêiner principal para obter suas dimensões
    const containerRef = React.useRef(null);

    // Função executada quando o mouse passa por cima do botão "Não"
    const handleNoMouseEnter = () => {
        // Verifica se a referência ao contêiner existe
        if (containerRef.current) {
            // Obtém as dimensões do contêiner e do próprio botão
            const containerRect = containerRef.current.getBoundingClientRect();
            // É importante pegar o botão pela classe para obter suas dimensões atuais
            const button = document.querySelector('.no-button');
            if (!button) return;
            const buttonRect = button.getBoundingClientRect();

            // Calcula a posição máxima X e Y para que o botão não saia do contêiner
            const maxX = containerRect.width - buttonRect.width;
            const maxY = containerRect.height - buttonRect.height;

            // Gera uma nova posição aleatória
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            // Atualiza o estado com a nova posição, o que fará o React re-renderizar o botão no novo lugar
            setNoButtonPosition({
                top: `${newY}px`,
                left: `${newX}px`,
            });
        }
    };

    // Função executada quando o botão "Sim" é clicado
    const handleYesClick = () => {
        // Torna a mensagem final visível
        setMessageVisible(true);
        // Esconde os botões para uma tela mais limpa
        setButtonsVisible(false);
    };

    // A estrutura JSX que será renderizada na tela
    return (
        <div className="container" ref={containerRef}>
            {/* A mensagem final só é renderizada se messageVisible for true */}
            {messageVisible ? (
                <div className="message">Agora já pode beijar o noivo! ❤️</div>
            ) : (
                // Caso contrário, mostra a pergunta
                <h1>Quer namorar comigo?</h1>
            )}

            {/* O contêiner dos botões só é renderizado se buttonsVisible for true */}
            {buttonsVisible && (
                <div className="button-container">
                    <button className="yes-button" onClick={handleYesClick}>
                        Sim
                    </button>
                    <button
                        className="no-button"
                        style={noButtonPosition}
                        onMouseEnter={handleNoMouseEnter}
                    >
                        Não
                    </button>
                </div>
            )}
        </div>
    );
}

// Renderiza o componente App no elemento com o id 'root' do nosso HTML
ReactDOM.render(<App />, document.getElementById('root'));
