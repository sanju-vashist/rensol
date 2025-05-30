const CONFIG = {
    API_KEY: 'AIzaSyDQiYbOiipZKKWz5Ar37u55FcjtatEWotA',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    KNOWLEDGE_BASE: 
        "Rensol Technologies is a global IT services company specializing in software development, digital transformation, and enterprise solutions. " +
        "Founded with a focus on delivering innovative and customized technology services, Rensol serves clients across multiple industries including healthcare, finance, education, and retail. " +
        "The company emphasizes agile methodologies, cloud computing, and cutting-edge technologies to drive business growth and operational efficiency." +
        "\n\n" +
        "Core Competencies: " +
        "1. Custom Software Development - Tailored software solutions to meet unique business needs. " +
        "2. Mobile & Web App Development - Cross-platform apps with a focus on performance and user experience. " +
        "3. Cloud Solutions - Migration, deployment, and management on AWS, Azure, and Google Cloud. " +
        "4. Data Analytics & AI - Leveraging data-driven insights and AI models to enhance decision-making. " +
        "5. IT Consulting & Support - End-to-end IT services including system integration and maintenance." +
        "\n\n" +
        "Key Projects: " +
        "1. Healthcare Management System - A comprehensive platform for patient records, appointments, and billing. " +
        "2. E-commerce Platform - Scalable online store with integrated payment gateways and inventory management. " +
        "3. Learning Management System - An interactive platform for educational content and assessments. " +
        "4. Financial Analytics Tool - Real-time dashboards for financial performance tracking and forecasting." +
        "\n\n" +
        "Achievements: " +
        "Rensol Technologies has been recognized for excellence in client satisfaction, timely delivery, and innovative solutions. " +
        "The company continuously invests in R&D to stay ahead in technology trends and maintain competitive advantage." +
        "\n\n" +
        "Projects: " +
        "1. Saanjavni: A comprehensive medical information app with biometric registration, family medical history, emergency access, and monetization features. Created using Flutter and Firebase. " +
        "2. Lafda: An anonymous chatting app that allows users to interact in group chats and share thoughts freely. " +
        "2. Dowry Calculator: A fun app that calculates a hypothetical dowry amount based on user qualifications. " +
        "4. The Normal app: A simple app that steals your data and sends it to server without even knowing and its aim is to educate how easy is to steal your data and how chiness app may do it.created using react native and supbase " +
        "\n\n" +
        "Work Culture & Vision: " +
        "Rensol is committed to fostering a collaborative work culture, empowering teams, and driving digital innovation worldwide. " +
        "They focus on continuous learning, employee growth, and building sustainable technology ecosystems for clients globally."
};

const queryKnowledgeBase = async (userQuery, knowledgeBase) => {
    try {
        const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: "${knowledgeBase}" 
                               Question: "${userQuery}"
                               Please provide a brief, 2-3 line response.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error querying knowledge base:', error);
        return 'Sorry, I encountered an error processing your request.';
    }
};

class VoiceAssistant {
    constructor() {
        this.micButton = document.getElementById('micButton');
        this.stopButton = document.getElementById('stopButton');
        this.transcriptDiv = document.getElementById('transcript');
        this.responseDiv = document.getElementById('response');
        this.overlay = document.getElementById('overlay');
        this.popup = document.getElementById('popup');
        this.isListening = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.knowledgeBase = CONFIG.KNOWLEDGE_BASE; 

        this.initializeSpeechRecognition();
        this.setupEventListeners();
    }

    initializeSpeechRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                this.transcriptDiv.textContent = `You said: ${transcript}`;

                if (event.results[current].isFinal) {
                    this.processQuery(transcript);
                }
            };

            this.recognition.onend = () => {
                this.stopListening();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.responseDiv.textContent = 'Error: ' + event.error;
                this.stopListening();
            };
        } else {
            this.micButton.disabled = true;
            alert('Speech recognition is not supported in your browser.');
        }
    }

    setupEventListeners() {
        this.micButton.addEventListener('click', () => {
            if (this.isListening) {
                this.stopListening();
            } else {
                this.startListening();
            }
        });

        this.stopButton.addEventListener('click', () => {
            this.stopListening();
            this.hidePopup();
            this.synthesis.cancel();
        });

        this.overlay.addEventListener('click', () => {
            this.hidePopup();
        });
    }

    startListening() {
        if (this.recognition) {
            try {
                this.recognition.start();
                this.isListening = true;
                this.micButton.classList.add('listening');
                this.transcriptDiv.textContent = 'Listening...';
                this.showPopup();
            } catch (error) {
                console.error('Error starting recognition:', error);
            }
        }
    }

    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
                this.isListening = false;
                this.micButton.classList.remove('listening');
            } catch (error) {
                console.error('Error stopping recognition:', error);
            }
        }
    }

    showPopup() {
        this.overlay.style.display = 'block';
        this.popup.style.display = 'block';
    }

    hidePopup() {
        this.overlay.style.display = 'none';
        this.popup.style.display = 'none';
    }

    speak(text) {
        if (!text) return;

        this.synthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Wait for voices to be loaded
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                const voices = speechSynthesis.getVoices();
                utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
                this.synthesis.speak(utterance);
            });
        } else {
            const voices = speechSynthesis.getVoices();
            utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
            this.synthesis.speak(utterance);
        }
    }

    async processQuery(query) {
        try {
            this.responseDiv.textContent = 'Processing...';
            const response = await queryKnowledgeBase(query, this.knowledgeBase);
            this.responseDiv.textContent = `Answer: ${response}`;
            this.speak(response);
        } catch (error) {
            console.error('Error processing query:', error);
            this.responseDiv.textContent = 'Sorry, there was an error processing your request.';
        }
    }
}

// Initialize the voice assistant when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceAssistant();
    
    // Initialize chat functionality
    initializeChatFunctionality();
});

// Chat functionality
function initializeChatFunctionality() {
    const chatOverlay = document.getElementById('chatOverlay');
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatButton = document.getElementById('chatButton');
    const closeChatButton = document.getElementById('closeChatButton');

    // Open chat overlay
    chatButton.addEventListener('click', function() {
        chatOverlay.classList.add('show');
        chatInput.focus();
    });

    // Close chat overlay
    closeChatButton.addEventListener('click', function() {
        chatOverlay.classList.remove('show');
    });

    // Send message function
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Display user message
        const userMsgEl = document.createElement('div');
        userMsgEl.className = 'message user-message';
        userMsgEl.textContent = userMessage;
        chatContainer.appendChild(userMsgEl);

        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        const prompt = `
You are an AI assistant with access to the following knowledge base:
"""
${CONFIG.KNOWLEDGE_BASE}
"""

Please answer the user's question **based only on the information in the knowledge base replay in a proper format and to any word of appritation like hello and hi reply with anthusisem**.
If the answer is not in the knowledge base, respond with "I am not able to understand or unable to help you with this please ask anything else."

User's question: ${userMessage}
`;

        try {
            const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;

            // Display AI response
            const aiMsgEl = document.createElement('div');
            aiMsgEl.className = 'message ai-message';
            aiMsgEl.textContent = aiResponse;
            chatContainer.appendChild(aiMsgEl);
        } catch (error) {
            console.error('Error:', error);
            const aiMsgEl = document.createElement('div');
            aiMsgEl.className = 'message ai-message';
            aiMsgEl.textContent = 'Error: Failed to get a response from AI';
            chatContainer.appendChild(aiMsgEl);
        }

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}