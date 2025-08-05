function applySmartPlaceholder(el, binding) {
  if (binding.modifiers && binding.modifiers.ignore) return;

  if (binding.value) {
    el.setAttribute("placeholder", binding.value);
    return;
  }

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

  let matched = false;
  for (const key in placeholders) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      el.setAttribute("placeholder", placeholders[key]);
      matched = true;
      break;
    }
  }

  if (!matched) {
    el.setAttribute(
      "placeholder",
      isArabic ? "املأ هذا الحقل" : "Fill this field"
    );
  }
}

const directive = {
  mounted(el, binding) {
    // Vue 3
    applySmartPlaceholder(el, binding);
  },
  inserted(el, binding) {
    // Vue 2
    applySmartPlaceholder(el, binding);
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
