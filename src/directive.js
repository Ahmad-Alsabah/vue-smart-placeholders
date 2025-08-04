function applySmartPlaceholder(el) {
  const name = el.getAttribute("name") || el.getAttribute("type") || "";
  const lang = document.documentElement.lang || navigator.language;
  const isArabic = lang.startsWith("ar");

  const placeholders = {
    fullName: isArabic ? "اكتب اسمك الكامل" : "Enter your full name",
    email: "example@example.com",
    password: isArabic ? "أدخل كلمة المرور" : "Enter your password",
    phone: isArabic ? "أدخل رقم الهاتف" : "Enter your phone number",
    message: isArabic ? "اكتب رسالتك هنا" : "Write your message here",
  };

  for (const key in placeholders) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      el.setAttribute("placeholder", placeholders[key]);
      break;
    }
  }
}

const directive = {
  mounted(el) {
    // Vue 3
    applySmartPlaceholder(el);
  },
  inserted(el) {
    // Vue 2
    applySmartPlaceholder(el);
  },
};

export default {
  install(appOrVue) {
    const isVue3 =
      typeof appOrVue.version === "string" && appOrVue.version.startsWith("3");
    if (isVue3) {
      appOrVue.directive("smart-placeholder", directive);
    } else {
      appOrVue.directive("smart-placeholder", {
        inserted: directive.inserted,
      });
    }
  },
};
