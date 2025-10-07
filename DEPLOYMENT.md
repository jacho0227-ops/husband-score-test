# 웹사이트 배포 안내 (Cloudflare Pages)

이 문서는 현재 프로젝트를 Cloudflare Pages를 통해 인터넷에 무료로 게시하는 방법을 안내합니다.

## 준비물

- **GitHub 계정**: 코드를 저장하기 위해 필요합니다. (없으시다면 [github.com](https://github.com)에서 가입)
- **Cloudflare 계정**: 웹사이트를 배포하기 위해 필요합니다. (없으시다면 [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)에서 가입)

---

## 1단계: GitHub에 프로젝트 업로드하기

Cloudflare Pages는 GitHub 저장소에 있는 파일을 가져와서 웹사이트를 만듭니다. 따라서, 먼저 모든 프로젝트 파일을 GitHub에 올려야 합니다.

1.  **새 저장소(Repository) 만들기**
    *   GitHub에 로그인한 후, 오른쪽 상단의 `+` 아이콘을 누르고 **New repository**를 선택합니다.
    *   `Repository name`에 `husband-score-test`와 같이 원하시는 프로젝트 이름을 입력합니다.
    *   **Public**으로 설정하고, 다른 옵션은 건드리지 않고 **Create repository** 버튼을 클릭합니다.

2.  **파일 업로드하기**
    *   방금 만든 저장소 페이지에서 **Add file** > **Upload files**를 클릭합니다.
    *   `C:\python2\project1` 폴더 안에 있는 모든 파일과 폴더들을 끌어다 놓거나 선택해서 업로드합니다.
        *   **업로드 대상:** `index.html`, `css` 폴더, `js` 폴더, `lang` 폴더, `robots.txt`, `sitemap.xml`
    *   파일 업로드가 완료되면, 페이지 하단의 **Commit changes** 버튼을 클릭하여 저장을 완료합니다.

---

## 2단계: Cloudflare Pages에 배포하기

1.  **Cloudflare 로그인 및 Pages 메뉴 이동**
    *   Cloudflare에 로그인한 후, 왼쪽 메뉴에서 **Workers & Pages**를 선택합니다.

2.  **애플리케이션 생성 및 Git 연동**
    *   **Create application** 버튼을 클릭합니다.
    *   **Pages** 탭을 선택하고 **Connect to Git** 버튼을 클릭합니다.
    *   GitHub 계정과 연동하고, 방금 만든 `husband-score-test` 저장소를 선택한 후 **Begin setup**을 클릭합니다.

3.  **빌드 설정 및 배포 (가장 중요!)**
    *   **Project name**은 자동으로 설정됩니다.
    *   **Build settings** 섹션에서 **Framework preset**을 반드시 **None**으로 선택합니다.
    *   `Build command`와 `Build output directory`는 **아무것도 입력하지 않고 비워둡니다.**
    *   맨 아래의 **Save and Deploy** 버튼을 클릭합니다.

4.  **배포 완료**
    *   잠시 후 배포가 시작되며, 1분 내외로 완료됩니다.
    *   배포가 성공적으로 끝나면, 프로젝트 대시보드에서 `https://<프로젝트이름>.pages.dev` 형태의 고유한 웹사이트 주소를 받게 됩니다. 이 주소로 접속하면 누구나 '남편 점수 테스트'를 이용할 수 있습니다.

---

## 3단계: 배포 후 최종 작업 (SEO 최적화)

배포가 완료되어 실제 웹사이트 주소를 받았다면, SEO가 올바르게 작동하도록 코드의 임시 주소를 실제 주소로 변경해야 합니다.

1.  **`sitemap.xml` 파일 수정**
    *   `http://www.example.com/` 부분을 발급받은 실제 웹사이트 주소(예: `https://husband-score-test.pages.dev/`)로 변경하고 다시 GitHub에 업로드합니다.

2.  **`index.html` 파일 수정**
    *   `<head>` 태그 안에 있는 `https://your-website-url.com/` 부분을 모두 실제 웹사이트 주소로 변경합니다.
    *   소셜 공유 시 표시될 대표 이미지(`og-image.jpg`)를 프로젝트에 추가하고, `og:image`와 `twitter:image` 태그의 주소를 실제 이미지 경로로 수정합니다.


이 모든 과정을 마치면, 웹사이트가 완전히 최적화된 상태로 인터넷에 게시됩니다.
