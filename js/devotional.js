async function loadInspiration() {
    const wall = document.getElementById("devotionalWall");
    if(!wall) return;
    
    wall.innerHTML = "<p style='color:white; text-align:center;'>📜 Gathering divine downloads...</p>";
    
    try {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/devotionals");
        const data = await res.json();
        
        if (!data || data.length === 0) {
            wall.innerHTML = "<p style='color:white; opacity:0.5; text-align:center;'>The scrolls are currently empty. Be the first to add a word!</p>";
            return;
        }

        wall.innerHTML = data.slice().reverse().map((d, index) => `
            <div class="gazette-card torn-edge" style="opacity:1; transform:none; margin-bottom:30px;">
                <div class="gazette-title serif-title">🕊️ Divine Download</div>
                <div style="font-weight: 800; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin-bottom: 25px; font-size: 0.9rem; opacity: 0.6;">
                    CHAPTER: ${d.title}
                </div>
                <div id="text-${index}" class="gazette-body">
                    ${d.content}
                </div>
                <div style="margin-top: 40px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 25px; display: flex; justify-content: space-between; align-items: center;">
                    <button class="voice-btn" onclick="speakText('text-${index}', this, 'stop-${index}')" style="background: #1a1a1a; color: #fdf6e3; border-radius: 5px; padding: 10px 20px; font-weight: 800; cursor: pointer; border: none;">
                        📜 LISTEN
                    </button>
                    <button id="stop-${index}" class="stop-btn" onclick="stopText(this)" style="display: none; background: #dc2626; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                         Stop
                    </button>
                </div>
            </div>
        `).join("");

    } catch (err) {
        console.error("Critical Load Error:", err);
        wall.innerHTML = "<p style='color:red; text-align:center;'>System Error: Cannot reach the scrolls. Refreshing...</p>";
    }
}

function speakText(elementId, playBtn, stopId) {
    window.speechSynthesis.cancel();
    const text = document.getElementById(elementId).innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    const stopBtn = document.getElementById(stopId);
    utterance.onstart = () => { stopBtn.style.display = "inline-block"; playBtn.innerText = "🎧..."; };
    utterance.onend = () => { stopBtn.style.display = "none"; playBtn.innerText = "📜 LISTEN"; };
    window.speechSynthesis.speak(utterance);
}

function stopText(btn) {
    window.speechSynthesis.cancel();
    btn.style.display = "none";
}

// RUN IMMEDIATELY
loadInspiration();
