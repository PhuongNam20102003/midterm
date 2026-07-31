/* =====================================================================
   PORTFOLIO WEBSITE — JAVASCRIPT DÙNG CHUNG
   File này được cả 3 trang (index, travel-diary, bucket-list) cùng
   dùng chung. Mỗi phần đều có comment giải thích để bạn dễ theo dõi.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------------------------
     1. MOBILE MENU (hamburger)
     Bấm nút hamburger -> mở/đóng menu, đồng thời đổi icon 3 gạch
     thành dấu X bằng cách toggle class "is-active" / "is-open".
  ------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelector(".nav__links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("is-active");
      navLinks.classList.toggle("is-open");
    });

    // Khi bấm 1 link trong menu mobile -> tự động đóng menu lại
    var links = navLinks.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("is-active");
        navLinks.classList.remove("is-open");
      });
    });
  }

  /* -------------------------------------------------------------
     2. HIỆU ỨNG HEADER KHI CUỘN TRANG
     Cuộn xuống quá 40px -> thêm class "is-scrolled" để header có
     đổ bóng (xem CSS: .site-header.is-scrolled).
  ------------------------------------------------------------- */
  var header = document.querySelector(".site-header");

  function handleHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderShadow);
  handleHeaderShadow(); // gọi 1 lần khi load trang, phòng khi trang đã cuộn sẵn

  /* -------------------------------------------------------------
     3. SCROLL REVEAL — CÁC PHẦN TỬ MỜ DẦN HIỆN RA KHI CUỘN TỚI
     Dùng Intersection Observer: trình duyệt tự báo cho mình biết
     khi nào 1 phần tử ".reveal" xuất hiện trong khung nhìn (viewport).
     Khi đó ta thêm class "is-visible" để CSS chạy animation.
  ------------------------------------------------------------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // đã hiện rồi thì thôi, không cần theo dõi phần tử này nữa
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // hiện ra khi 15% phần tử lọt vào khung nhìn
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    // Trình duyệt quá cũ không hỗ trợ -> hiện luôn, khỏi cần hiệu ứng
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* -------------------------------------------------------------
     4. "ĐÓNG DẤU" TƯƠNG TÁC CHO BUCKET LIST (Trang 3)
     Bấm vào nút trong 1 thẻ địa điểm -> con dấu viền nét đứt
     chuyển thành viền liền (giống như vừa được "check-in").
     Lưu ý: trạng thái này chỉ tồn tại trong phiên xem hiện tại
     (không lưu lại khi tải lại trang) — phù hợp với 1 hiệu ứng
     tương tác cơ bản theo yêu cầu đề bài.
  ------------------------------------------------------------- */
  var checkButtons = document.querySelectorAll("[data-check-btn]");

  checkButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".entry-card");
      if (!card) return;

      var isChecked = card.classList.toggle("is-checked");
      btn.textContent = isChecked ? "Đã đánh dấu ✓" : "Đánh dấu muốn đến";
    });
  });
});
