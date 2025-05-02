
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  
    // ─── Supabase Initialization ───────────────────────────────────────────
    const SUPABASE_URL = 'https://eqszylsxlxprbclrczmt.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxc3p5bHN4bHhwcmJjbHJjem10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTIxMTksImV4cCI6MjA2MTc2ODExOX0.pkvCOpgr3pVbVmb4ATgRdZVcP6PIquHQ_XDB7il8gOU';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let isPremium = false;
    let chatHistory = [];
    let recognition;
    const offlineReplies = [
      "I'm offline right now. Try connecting to the internet.",
      "Even AI needs Wi-Fi sometimes 😅",
      "Offline mode: engaged. Limited powers active."
    ];

    // ─── On Load: Restore Session ────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', async () => {
      const modelSelect = document.getElementById('model-select');
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session?.user) {
        isPremium = true;
        modelSelect.disabled = false;
        document.getElementById('login-status').textContent = `✅ Logged in as ${session.user.email}`;
      } else {
        modelSelect.disabled = true;
      }
    });

    // ─── Authentication Functions ──────────────────────────────────────────
    async function login() {
      const email = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const status = document.getElementById('login-status');
      const modelSelect = document.getElementById('model-select');
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        status.style.color = 'red';
        status.textContent = `❌ ${error.message}`;
        return;
      }
      isPremium = true;
      modelSelect.disabled = false;
      status.style.color = 'green';
      status.textContent = `✅ Logged in as ${data.user.email}`;
    }

    async function register() {
      const email = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const status = document.getElementById('login-status');
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) {
        status.style.color = 'red';
        status.textContent = `❌ ${error.message}`;
        return;
      }
      status.style.color = 'green';
      status.textContent = '✅ Registered! Check your email to confirm.';
    }
  async function loginWithGitHub() {
  const status = document.getElementById('login-status');
  const modelSelect = document.getElementById('model-select');

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'github'
  });

  if (error) {
    status.style.color = 'red';
    status.textContent = `❌ ${error.message}`;
    return;
  }

  // Wait for the session to be established
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session?.user) {
    isPremium = true;
    modelSelect.disabled = false;
    status.style.color = 'green';
    status.textContent = `✅ Logged in as ${session.user.email}`;
  }
}

    function quickInsert(type) {
      const promptInput = document.getElementById('prompt');
      const modelSelect = document.getElementById('model-select');
      if (type === "Search") {
        promptInput.value = "Search:";
        modelSelect.value = "searchgpt";
      } else if (type === "Reason") {
        promptInput.value = "Reason:";
        modelSelect.value = "mistral";
      } else if (type === "Deep Research") {
        promptInput.value = "Deep Research:";
        modelSelect.value = "searchgpt";
      } else if (type === "Create image") {
        promptInput.value = "Create image:";
      }
    }

    async function handleInput() {
      const promptInput = document.getElementById('prompt');
      let prompt = promptInput.value.trim();
      if (!prompt) return;
      addMessage('user', prompt);
      promptInput.value = '';
      if (!navigator.onLine) {
        const offlineReply = offlineReplies[Math.floor(Math.random() * offlineReplies.length)];
        addMessage('ai', offlineReply);
        return;
      }
      let model = isPremium ? document.getElementById('model-select').value : 'openai';
      if (/^(create|generate|draw|paint)\s+image/i.test(prompt)) {
        const cleaned = prompt.replace(/^(create|generate|draw|paint)\s+image\s*/i, '');
        return generateImage(cleaned || "a beautiful scene");
      }
      if (/^search:/i.test(prompt)) {
        model = "searchgpt";
        prompt = prompt.replace(/^search:/i, '').trim();
      }
      if (/^reason:/i.test(prompt)) {
        model = "mistral";
        prompt = prompt.replace(/^reason:/i, '').trim();
      }
      if (/^deep research:/i.test(prompt)) {
        model = "searchgpt";
        prompt = prompt.replace(/^deep research:/i, '').trim() + " (Respond with thorough research, include sources if possible)";
      }
      if (/analyze/i.test(prompt)) {
        model = "openai-large";
      }
      if (/speak|say/i.test(prompt)) {
        model = "openai-audio";
        return generateSpeech(prompt.replace(/^(speak|say)\s*/i, ''));
      }
      if (!isPremium) {
        await new Promise(res => setTimeout(res, 3000));
      }
      await streamChat(prompt, model);
    }

    function addMessage(role, content, isImage = false) {
      const chat = document.getElementById('chat');
      const div = document.createElement('div');
      div.className = 'message ' + role;
      if (isImage) {
        div.innerHTML = `<img src="${content}" />`;
      } else {
        div.innerHTML = marked.parse(content);
      }
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    async function streamChat(userPrompt, model) {
      const loaderDiv = document.createElement('div');
      loaderDiv.className = 'message ai';
      loaderDiv.innerHTML = 'Thinking...';
      document.getElementById('chat').appendChild(loaderDiv);
      try {
        const messages = [...chatHistory, {role: "user", content: userPrompt}];
        const res = await fetch("https://text.pollinations.ai/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "text/event-stream" },
          body: JSON.stringify({ model, messages, stream: true })
        });
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const json = JSON.parse(line.slice(6));
                const delta = json.choices?.[0]?.delta?.content;
                if (delta) {
                  fullText += delta;
                  loaderDiv.innerHTML = marked.parse(fullText);
                  loaderDiv.scrollIntoView({ behavior: "smooth", block: "end" });
                }
              } catch (e) {
                console.warn("JSON parse error:", e);
              }
            }
          }
        }
        let processed = fullText.replace(/<think>(.*?)<\/think>/gs, '<span class="think">$1</span>');
        loaderDiv.innerHTML = marked.parse(processed);
        chatHistory.push({role: "user", content: userPrompt}, {role: "assistant", content: fullText});
      } catch (error) {
        loaderDiv.textContent = "❌ Error! Could not get a response.";
        console.error("Stream error:", error);
      }
    }

    function generateImage(prompt) {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
      addMessage('ai', url, true);
    }

    function startListening() {
      if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          document.getElementById('prompt').value = transcript;
          handleInput();
        };
      }
      recognition.start();
    }

    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      addMessage('user', `Uploaded image: ${file.name}`, true);
      addMessage('ai', `<img src="${url}" style="max-width: 250px; border-radius: 10px; margin-top: 5px;">`, true);
    }

    function handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const fileName = file.name;
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        addMessage('user', `Uploaded image: ${fileName}`, true);
        addMessage('ai', `<img src="${url}" style="max-width: 250px; border-radius: 10px; margin-top: 5px;">`, true);
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          addMessage('user', `File content of "${fileName}":\n${content}`);
        };
        reader.readAsText(file);
      } else if (fileName.endsWith('.pdf') || fileName.endsWith('.docx')) {
        const url = URL.createObjectURL(file);
        addMessage('user', `Uploaded document: ${fileName}`, false);
        addMessage('ai', `
          <iframe 
            src="${url}" 
            style="width: 100%; height: 400px; border: 1px solid #ddd; border-radius: 8px;"
            frameborder="0">
          </iframe>
        `);
      } else {
        addMessage('user', `Unsupported file type: ${fileName}`);
      }
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(() => {
          console.log('✅ Service Worker registered');
        }, err => {
          console.warn('Service Worker registration failed:', err);
        });
      });
    }
  
