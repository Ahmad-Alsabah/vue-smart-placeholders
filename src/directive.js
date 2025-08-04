const smartPlaceholder = {
  inserted(el) {
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
  },
};

export default {
  install(Vue) {
    Vue.directive("smart-placeholder", smartPlaceholder);
  },
};
