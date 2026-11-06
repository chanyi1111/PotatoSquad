(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('.theme-toggle');

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // 버튼 클릭 → 반대 모드로 바꾸고 기억
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });

  // 사용자가 직접 고른 적 없으면, OS 다크모드 설정이 바뀔 때 따라감
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) {}
      if (!saved) apply(e.matches ? 'dark' : 'light');
    });
  }

  apply(current());   // head에서 정한 값으로 버튼 상태 맞추기
})();