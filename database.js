function showResult() {
    var counts = { A: 0, B: 0, C: 0 };
    qAnswers.forEach(function(ans) { if (ans) counts[ans]++; });

    var win = 'A';
    if (counts.B > counts.A) win = 'B';
    if (counts.C > counts[win]) win = 'C';

    var res = PROFILES[win];
    var uid = user ? user.id : 'anon';
    dbInsertSession(uid, qAnswers, win);

    showScreen('screen-result');
    
    var rw = document.getElementById('result-wrap');
    var rc = document.getElementById('result-card');
    if (rw) rw.style.display = 'block';
    if (rc) rc.className = 'result-card rc-' + res.cls;

    document.getElementById('result-icon').innerHTML = res.icon;
    document.getElementById('result-title').textContent = res.title;
    document.getElementById('result-desc').textContent = res.desc;

    // Renderiza as barras de score
    var sr = document.getElementById('score-row');
    if (sr) {
        sr.innerHTML = '';
        ['A', 'B', 'C'].forEach(function(L) {
            var p = PROFILES[L];
            var pct = Math.round((counts[L] / QUESTIONS.length) * 100);
            sr.innerHTML += '<div class="score-pill"><div class="pill-dot" style="background:var(--a' + L.toLowerCase() + ')"></div>' +
                            '<span>' + pct + '% ' + p.title.split(' ')[1] + '</span></div>';
        });
    }

    // Renderiza as dicas
    var tg = document.getElementById('tips-grid');
    if (tg) {
        tg.innerHTML = '';
        TIPS[win].forEach(function(t) {
            tg.innerHTML += '<div class="tip-card"><span class="tip-icon">' + t.i + '</span>' +
                            '<div class="tip-title">' + t.t + '</div><div class="tip-text">' + t.d + '</div></div>';
        });
    }
}

function restartQuiz() {
    startQuiz();
}

// Inicialização ao carregar a página
window.onload = function() {
    var saved = sessionStorage.getItem('ap_session');
    if (saved) {
        user = JSON.parse(saved);
        setTopbar();
        startQuiz();
    }
};

})(); // Fecha a função autoinvocada
</script>
</body>
</html>
