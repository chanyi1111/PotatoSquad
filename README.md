# PotatoSquad — Chanyi Park 개인 소개 사이트

Hugo로 만든 개인 포트폴리오 사이트입니다. 영어와 한국어 두 페이지, 다크모드를 지원합니다.

- 공개 사이트: https://chanyi1111.github.io/PotatoSquad/ (한국어: https://chanyi1111.github.io/PotatoSquad/ko/)
- 저장소: https://github.com/chanyi1111/PotatoSquad
- 배포: `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드하고 GitHub Pages에 배포합니다.

## 목차

- [필요한 도구](#필요한-도구)
- [로컬 실행](#로컬-실행)
- [배포와 같은 빌드](#배포와-같은-빌드)
- [수정할 파일 위치](#수정할-파일-위치)
- [수정과 재배포 방법](#수정과-재배포-방법)
- [직접 추가한 기능](#직접-추가한-기능)
- [출처와 라이선스](#출처와-라이선스)

## 필요한 도구

| 도구 | 버전 | 용도 |
|---|---|---|
| Git | 2.x | 저장소 받기, 커밋, push |
| Hugo **extended** | **0.158.0 이상** (확인: 0.167.0, 0.168.0) | 사이트 빌드와 미리보기 |
| Python | 3.12 이상 (선택) | 배포와 같은 빌드 스크립트 실행 |

`hugo.Data`, 언어별 `locale`·`label` 설정을 쓰기 때문에 Hugo 0.158 미만에서는 빌드되지 않습니다.

설치 (Windows):

```powershell
winget install Git.Git
winget install Hugo.Hugo.Extended
hugo version   # "+extended" 와 0.158 이상인지 확인
```

macOS는 `brew install git hugo` 로 설치합니다.

## 로컬 실행

```bash
git clone https://github.com/chanyi1111/PotatoSquad.git
cd PotatoSquad
git checkout develop        # 작업 브랜치
cd site
hugo server --theme template --baseURL http://localhost:1313/
```

- 영어: http://localhost:1313/
- 한국어: http://localhost:1313/ko/
- 파일을 저장하면 브라우저가 자동으로 새로고침됩니다. 끝낼 때는 `Ctrl + C`.

옵션이 필요한 이유:

- `--theme template`: 테마 설정이 `site/hugo.toml`이 아니라 `site/pages.json`에 있어서, 옵션 없이 `hugo server`만 실행하면 테마를 찾지 못해 화면이 깨집니다.
- `--baseURL http://localhost:1313/`: 실제 주소의 `/PotatoSquad/` 하위 경로 대신 루트에서 열어야 `/images/...` 같은 경로가 로컬에서 맞습니다.

## 배포와 같은 빌드

GitHub Actions가 실행하는 것과 같은 빌드를 로컬에서 해 볼 수 있습니다. 저장소 루트에서 실행합니다.

```bash
python .github/pages_build.py --build
```

- 결과물은 저장소 루트의 `public/` 폴더에 생기며 Git에는 올리지 않습니다(`.gitignore`).
- 이 스크립트는 `hugo --gc --minify --config hugo.toml,pages.json --theme template` 으로 빌드한 뒤, 이미지·CSS 경로 앞에 `/PotatoSquad/`를 붙여 줍니다.
- 설정 파일: `.github-pages.json`(빌드 설정), `.github/workflows/hugo-pages.yml`(Actions 워크플로)

## 수정할 파일 위치

모든 경로는 저장소 루트 기준입니다. 테마는 `site/themes/template/`만 빌드에 쓰이고, 루트의 `layouts/`, `assets/`는 원본 테마 사본이라 빌드에 쓰이지 않습니다.

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 이름, 이메일, GitHub, 프로필 이미지 | `site/hugo.toml`의 `[params]` |
| 사이트 제목, 한 줄 소개, 위치 (언어별) | `site/hugo.toml`의 `[languages.en.params]`, `[languages.ko.params]` |
| 소개 글 (About) | `site/content/_index.md` (영어), `site/content/_index.ko.md` (한국어) |
| 활동, 기술, 학력, 자격증, 언어 능력 | `site/data/*.yaml` (영어), `site/data/ko/*.yaml` (한국어) |
| 메뉴·버튼·섹션 제목 문구 | `site/i18n/en.yaml`, `site/i18n/ko.yaml` |
| 프로필 이미지 파일 | `site/static/images/profile.svg` |
| 색상, 다크모드 색 | `site/themes/template/assets/css/main.css` |
| 화면 구조 (HTML) | `site/themes/template/layouts/partials/*.html` |
| 다크모드 동작 | `site/themes/template/assets/js/theme-toggle.js` |

`site/data/ko/`에 파일이 없는 항목은 영어 `site/data/` 파일을 그대로 씁니다 (`site/themes/template/layouts/partials/site-data.html`).

## 수정과 재배포 방법

1. `develop` 브랜치에서 파일을 수정하고 [로컬 실행](#로컬-실행)으로 확인합니다.
2. 커밋하고 `develop`에 push합니다.
   ```bash
   git add <수정한 파일>
   git commit -m "무엇을 왜 바꿨는지"
   git push origin develop
   ```
3. GitHub에서 `develop` → `main` Pull Request를 만들어 merge합니다. (또는 `git push origin develop:main`)
4. 저장소의 **Actions** 탭에서 `Deploy Hugo to GitHub Pages` 실행이 자동으로 시작되고 `build`, `deploy`가 모두 초록색 체크로 끝나는지 확인합니다: https://github.com/chanyi1111/PotatoSquad/actions
5. 로그인하지 않은 창(시크릿 창)에서 공개 사이트를 열고 `Ctrl + Shift + R`로 새로고침해 수정 내용이 반영됐는지 확인합니다.

GitHub Pages 설정: Settings → Pages → Build and deployment → Source: **GitHub Actions**.

## 직접 추가한 기능

- **다크모드**: 메뉴의 해/달 버튼으로 전환, 선택은 브라우저(localStorage)에 저장, 첫 방문은 OS 설정을 따름.
  `main.css`의 `:root[data-theme="dark"]` 변수, `head.html`, `nav.html`, `theme-toggle.js`, `baseof.html`
- **영어/한국어 전환**: Hugo 다국어 기능. 메뉴의 EN/한글 버튼으로 `/`와 `/ko/` 사이를 이동하고 `<html lang>`이 언어별로 지정됨.
  `hugo.toml`의 `[languages]`, `i18n/*.yaml`, `data/ko/*.yaml`, `partials/site-data.html`
- **없는 파일 요청 정리**: 없는 배경 이미지·favicon·이력서·공유 이미지 참조를 제거하고 favicon을 인라인 SVG로 변경, LinkedIn 빈 링크를 GitHub 링크로 교체.

## 출처와 라이선스

| 자료 | 사용 위치 | 구분 | 출처 | 이용 조건 |
|---|---|---|---|---|
| Kiyomi Portfolio 테마 (Gerald Lim, mathscantor) | `site/themes/template/` 전체, 루트 `layouts/`·`assets/` | 외부 자료 | https://github.com/mathscantor/hugo-theme-kiyomi-portfolio | MIT License. 원본 고지는 [`LICENSE`](LICENSE), [`site/themes/template/LICENSE`](site/themes/template/LICENSE)에 유지, 원본 설명서는 [`site/themes/template/README.md`](site/themes/template/README.md) |
| GitHub Pages 준비 스크립트 | `prepare_github_pages.py`, `.github/pages_build.py`, `.github/workflows/hugo-pages.yml`, `.github-pages.json`, `site/pages.json` | 외부 자료 (수업 제공) | 2026학년도 초급프로젝트 수업 | 수업 안내에 따라 사용 |
| 웹폰트 Inter, Playfair Display | `main.css`의 `@import` | 외부 자료 | https://fonts.google.com/ | SIL Open Font License 1.1 |
| 아이콘 (메일, GitHub, 메뉴, 해/달 등) | 각 `partials/*.html`의 인라인 SVG | 외부 자료 | Lucide https://lucide.dev/ | ISC License |
| 프로필 아바타 (새싹 감자) | `site/static/images/profile.svg` | 직접 제작 (AI 보조) | Claude로 그린 SVG | 이용 제한 없음 |
| favicon 🥔 | `head.html`의 인라인 SVG | 직접 작성 | 이모지 문자를 넣은 SVG data URI | 이모지 그림은 사용자 OS 글꼴로 표시 |
| 소개·활동·기술 내용 | `site/content/`, `site/data/` | 직접 작성 (한국어판은 AI 번역 초안을 본인 수정) | 본인 | — |
| 다크모드, 영어/한국어 전환 코드 | 위 [직접 추가한 기능](#직접-추가한-기능)의 파일 | AI 생성 코드를 본인이 붙여넣고 수정 | Claude (Claude Opus 5.5) | AI 사용 내용은 과제 보고서에 기록 |
