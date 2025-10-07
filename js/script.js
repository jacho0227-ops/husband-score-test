$(document).ready(function() {
    // 모든 상태를 하나의 객체에서 관리
    const state = {
        currentQuestionIndex: 0,
        score: 0,
        questionsOrder: [],
        currentLang: 'ko'
    };

    let languageData;
    
    // 페이지 로드 시 기본 언어(한국어) 설정
    loadLanguage('ko');



    // --- 함수 정의 --- //

    /**
     * Fisher-Yates shuffle algorithm: 배열의 순서를 무작위로 섞습니다.
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * 특정 언어의 JSON 파일을 로드하고 UI를 업데이트합니다.
     */
    function loadLanguage(lang) {
        $.getJSON(`lang/${lang}.json`)
            .done(function(data) {
                state.currentLang = lang;
                languageData = data;
                updateUIText();
                updateActiveLangButton();
            })
            .fail(function() {
                console.error("언어 파일을 불러오는 데 실패했습니다.");
                alert("데이터를 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.");
            });
    }

    /**
     * languageData에 따라 페이지의 모든 텍스트를 업데이트합니다.
     */
    function updateUIText() {
        $('html').attr('lang', languageData.lang);
        $('title').text(languageData.title);
        $('#site-title').text(languageData.site_header_title);
        $('#footer-text').text(languageData.footer_text);
        $('#start-title').text(languageData.start_screen_title);
        $('#start-desc').text(languageData.start_screen_desc);
        $('#start-btn').text(languageData.start_button);
        $('#loading-text').text(languageData.loading_text);
        $('#retry-btn').text(languageData.retry_button);
    }

    /**
     * 현재 언어에 해당하는 버튼에 'active' 클래스를 추가합니다.
     */
    function updateActiveLangButton() {
        $('.lang-btn').removeClass('active');
        $(`.lang-btn[data-lang='${state.currentLang}']`).addClass('active');
    }

    /**
     * 특정 화면을 애니메이션과 함께 표시합니다.
     * @param {string} screenName - 표시할 화면의 이름 (start, quiz, loading, result)
     */
    function showScreen(screenName) {
        $('.screen').hide().removeClass('fade-in-up');
        const targetScreen = $(`#${screenName}-screen`);
        targetScreen.show().addClass('fade-in-up');
    }

    /**
     * 퀴즈를 시작합니다.
     */
    function startQuiz() {
        state.currentQuestionIndex = 0;
        state.score = 0;
        state.questionsOrder = [...languageData.questions];
        shuffleArray(state.questionsOrder);
        $('#progress-bar-inner').css('width', '0%');
        showScreen('quiz');
        showQuestion();
    }

    /**
     * 다음 질문을 표시하고 프로그레스 바를 업데이트합니다.
     */
    function showQuestion() {
        const progress = ((state.currentQuestionIndex + 1) / state.questionsOrder.length) * 100;
        $('#progress-bar-inner').css('width', progress + '%');
        let question = state.questionsOrder[state.currentQuestionIndex];
        $('#question-text').text(question.question);
        let answerButtons = $('#answer-buttons');
        answerButtons.empty();
        let shuffledAnswers = [...question.answers];
        shuffleArray(shuffledAnswers);
        shuffledAnswers.forEach(answer => {
            let button = $('<button></button>');
            button.addClass('answer-btn');
            button.text(answer.text);
            button.data('points', answer.points);
            answerButtons.append(button);
        });
    }

    /**
     * 로딩 화면을 표시합니다.
     */
    function showLoadingScreen() {
        showScreen('loading');
        setTimeout(showResult, 2000);
    }

    /**
     * 최종 결과를 계산하고 표시합니다.
     */
    function showResult() {
        let result;
        for (let i = 0; i < languageData.results.length; i++) {
            if (state.score >= languageData.results[i].min_score) {
                result = languageData.results[i];
                break;
            }
        }
        $('#result-title').text(result.title);
        $('#result-description').text(result.description);
        showScreen('result');
        
        // 공유 기능 초기화
        shareResult(state.score, result.title, result.description);
    }

    // --- 이벤트 리스너 --- //

    $('#lang-selector').on('click', '.lang-btn', function() {
        const selectedLang = $(this).data('lang');
        if (selectedLang !== state.currentLang) {
            loadLanguage(selectedLang);
            showScreen('start');
        }
    });

    $('#home-link').on('click', function(e) {
        e.preventDefault(); // 링크의 기본 동작(페이지 새로고침) 방지
        showScreen('start');
    });

    $('#start-btn').on('click', startQuiz);

    $('#answer-buttons').on('click', '.answer-btn', function() {
        state.score += $(this).data('points');
        state.currentQuestionIndex++;
        if (state.currentQuestionIndex < state.questionsOrder.length) {
            showQuestion();
        } else {
            showLoadingScreen();
        }
    });

    $('#retry-btn').on('click', startQuiz);


});