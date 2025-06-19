import { handleUserMessage } from './logic';

const WIDGET_ID = 'myjobits-chat-widget';

function injectStyles() {
  if (document.getElementById(`${WIDGET_ID}-styles`)) return;
  const style = document.createElement('style');
  style.id = `${WIDGET_ID}-styles`;
  style.innerHTML = `
#myjobits-chat-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: -apple-system, BlinkMacMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
}

#myjobits-chat-widget-button {
    background-color: #000000;
    color: white;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#myjobits-chat-widget-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

#myjobits-chat-widget-button svg {
    width: 24px;
    height: 24px;
    stroke: white;
    transition: transform 0.3s ease;
}

/* Ventana de chat con nueva altura y animación */
#myjobits-chat-widget-window {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    width: 360px;
    height: 700px; /* AUMENTADA A 700PX */
    flex-direction: column;
    margin-bottom: 10px;
    overflow: hidden;
    position: absolute;
    bottom: 70px;
    right: 0;
    border: 1px solid #f0f0f0;
    display: flex; /* Siempre como flex para mantener estructura */
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    transform-origin: bottom right;
    visibility: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}

#myjobits-chat-widget-window.open {
    opacity: 1;
    transform: scale(1) translateY(0);
    visibility: visible;
}

#myjobits-chat-widget-header {
    background-color: #000000;
    color: white;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Estilos para el logo en el header */
#myjobits-chat-widget-header .logo {
    height: 32px; /* Tamaño del logo */
    margin-right: 10px;
    vertical-align: middle;
}

#myjobits-chat-widget-close {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

#myjobits-chat-widget-close:hover {
    opacity: 1;
    background: rgba(255,255,255,0.1);
}

/* Botón para minimizar */
#myjobits-chat-widget-minimize {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 8px;
}

#myjobits-chat-widget-minimize:hover {
    opacity: 1;
    background: rgba(255,255,255,0.1);
}

#myjobits-chat-widget-messages {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: #fafafa;
}

.message {
    margin-bottom: 12px;
    padding: 10px 16px;
    border-radius: 18px;
    max-width: 80%;
    word-wrap: break-word;
    line-height: 1.4;
    font-size: 15px;
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.message.user {
    background-color: #000000;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
}

.message.bot {
    background-color: #ffffff;
    border: 1px solid #eee;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
}

#myjobits-chat-widget-input-container {
    display: flex;
    padding: 12px;
    background: white;
    border-top: 1px solid #f0f0f0;
}

#myjobits-chat-widget-input {
    flex-grow: 1;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    padding: 10px 18px;
    margin-right: 10px;
    outline: none;
    font-size: 15px;
    transition: border-color 0.2s;
}

#myjobits-chat-widget-input:focus {
    border-color: #888;
}

#myjobits-chat-widget-send-button {
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 24px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

#myjobits-chat-widget-send-button:hover {
    background-color: #333333;
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    justify-content: flex-start;
}

.option-button {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.option-button:hover {
    background-color: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-1px);
}

/* Media queries para móviles */
@media (max-width: 600px) {
  #myjobits-chat-widget-window {
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    margin-bottom: 0 !important;
  }
  #myjobits-chat-widget-header .logo {
    height: 28px;
  }
}
  `;
  document.head.appendChild(style);
}

function createWidgetElements() {
  let chatContainer = document.getElementById('myjobits-chat-widget-container');
  if (!chatContainer) {
    chatContainer = document.createElement('div');
    chatContainer.id = 'myjobits-chat-widget-container';
    document.body.appendChild(chatContainer);
  }
  chatContainer.innerHTML = `
    <div id="myjobits-chat-widget-button">
        <svg viewBox="0 0 24 24" fill="none" class="chat-icon">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" class="minimize-icon" style="display: none;">
            <path d="M19 9L12 16L5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div id="myjobits-chat-widget-window">
        <div id="myjobits-chat-widget-header">
            <img src="https://myjobits.com/wp-content/uploads/2025/03/cropped-Favicon-White.png" alt="MyJobits Logo" class="logo">
            <span style="font-weight: 500;">Asistente MyJobits</span>
            <div>
                <button id="myjobits-chat-widget-close" title="Cerrar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div id="myjobits-chat-widget-messages"></div>
        <div id="myjobits-chat-widget-input-container">
            <input type="text" id="myjobits-chat-widget-input" placeholder="Escribe un mensaje...">
            <button id="myjobits-chat-widget-send-button">Enviar</button>
        </div>
        <div id="myjobits-chat-widget-footer" style="padding:8px;text-align:center;font-size:13px;color:#888;background:#fafafa;">
          Power by <a href="https://www.myjobits.com" target="_blank" style="color:#000;text-decoration:underline;font-weight:500;">Jobits</a> 🤘
        </div>
    </div>
  `;
}

export function initChatWidget() {
  injectStyles();
  createWidgetElements();

  const chatButton = document.getElementById('myjobits-chat-widget-button');
  const chatWindow = document.getElementById('myjobits-chat-widget-window');
  const closeButton = document.getElementById('myjobits-chat-widget-close');
  const minimizeButton = document.getElementById('myjobits-chat-widget-minimize');
  const messagesContainer = document.getElementById('myjobits-chat-widget-messages');
  const messageInput = document.getElementById('myjobits-chat-widget-input') as HTMLInputElement;
  const sendButton = document.getElementById('myjobits-chat-widget-send-button');
  const chatIcon = chatButton?.querySelector('.chat-icon') as HTMLElement;
  const minimizeIcon = chatButton?.querySelector('.minimize-icon') as HTMLElement;

  function toggleChat(open?: boolean) {
    if (!chatWindow || !chatIcon || !minimizeIcon) return;
    if (open === undefined) {
      open = !chatWindow.classList.contains('open');
    }
    if (open) {
      chatWindow.classList.add('open');
      chatIcon.style.display = 'none';
      minimizeIcon.style.display = 'block';
      // Mensaje de bienvenida solo si es la primera vez
      if (messagesContainer && messagesContainer.children.length === 0) {
        addMessage({
          sender: 'bot',
          text: '¡Hey! ¿Qué onda? Soy tu asistente Jobits, listo para rockear contigo. ¿En qué te puedo ayudar hoy?',
          options: [
            'Asesoría Gratuita 🤘',
            'Asistencia Rápida ⚡',
            'Nueva Era Jobits 🔥',
            'FAQ Rockero 🎸'
          ]
        });
      }
    } else {
      chatWindow.classList.remove('open');
      chatIcon.style.display = 'block';
      minimizeIcon.style.display = 'none';
    }
  }

  function addMessage(data: { sender: 'user' | 'bot', text: string, options?: string[] }) {
    const messagesContainer = document.getElementById('myjobits-chat-widget-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', data.sender);
    if (data.sender === 'bot') {
      // Avatar para el bot
      const avatar = document.createElement('img');
      avatar.src = 'https://myjobits.com/wp-content/uploads/2025/03/cropped-Favicon-White.png';
      avatar.alt = 'Bot';
      avatar.style.width = '28px';
      avatar.style.height = '28px';
      avatar.style.borderRadius = '50%';
      avatar.style.marginRight = '8px';
      avatar.style.verticalAlign = 'middle';
      messageDiv.appendChild(avatar);
    }
    if (data.sender === 'bot' && data.options) {
      const messageText = document.createElement('p');
      messageText.innerText = data.text;
      messageText.style.display = 'inline';
      messageDiv.appendChild(messageText);
      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add('options-container');
      data.options.forEach(optionText => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-button');
        optionButton.innerText = optionText;
        optionButton.addEventListener('click', () => {
          const messageInput = document.getElementById('myjobits-chat-widget-input') as HTMLInputElement;
          messageInput.value = optionText;
          sendMessage();
        });
        optionsContainer.appendChild(optionButton);
      });
      messageDiv.appendChild(optionsContainer);
    } else {
      const textSpan = document.createElement('span');
      textSpan.innerText = data.text;
      textSpan.style.display = 'inline';
      messageDiv.appendChild(textSpan);
    }
    if (messagesContainer) {
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  async function sendMessage() {
    if (!messageInput) return;
    const message = messageInput.value.trim();
    if (message) {
      addMessage({ sender: 'user', text: message });
      messageInput.value = '';
      const botMsg = await handleUserMessage(message);
      addMessage(botMsg);
    }
  }

  chatButton?.addEventListener('click', () => toggleChat());
  minimizeButton?.addEventListener('click', () => toggleChat(false));
  closeButton?.addEventListener('click', () => toggleChat(false));
  sendButton?.addEventListener('click', sendMessage);
  messageInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}