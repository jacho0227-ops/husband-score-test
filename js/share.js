// 카카오톡 초기화
function initializeKakao() {
    if (window.Kakao) {
        // JavaScript 키로 초기화
        Kakao.init('YOUR_JAVASCRIPT_KEY'); // 여기에 JavaScript 키를 넣어주세요
    }
}

// 결과 공유하기
function shareResult(score, resultTitle, resultDesc) {
    const shareUrl = 'https://scoremyoppa.site';
    const shareTitle = '남편 점수 테스트 - ' + resultTitle;
    const shareDesc = resultDesc;

    // 카카오톡 공유하기
    function shareKakao() {
        if (!Kakao.isInitialized()) {
            alert('카카오톡 공유 기능을 초기화할 수 없습니다.');
            return;
        }

        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: shareTitle,
                description: shareDesc,
                imageUrl: 'https://scoremyoppa.site/images/og-image.jpg',
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                }
            },
            buttons: [
                {
                    title: '테스트 하러가기',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                }
            ]
        });
    }

    // 페이스북 공유하기
    function shareFacebook() {
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fbShareUrl, '_blank', 'width=600,height=400');
    }

    // 링크 복사하기
    function copyLink() {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('링크가 복사되었습니다!');
    }

    // 이벤트 리스너 등록
    document.getElementById('share-kakao').addEventListener('click', shareKakao);
    document.getElementById('share-facebook').addEventListener('click', shareFacebook);
    document.getElementById('copy-link').addEventListener('click', copyLink);
}

// 페이지 로드 시 카카오톡 초기화
document.addEventListener('DOMContentLoaded', initializeKakao);