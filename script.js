```javascript
// ==========================================
// Tandorost - Nutrition & Wellness Website
// Main JavaScript File
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const languageButton = document.getElementById("language-toggle");
    const mobileMenuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-nav");
    const contactForm = document.getElementById("contact-form");

    // ------------------------------------------
    // 1. Mobile Navigation
    // ------------------------------------------

    if (mobileMenuButton && navigation) {
        mobileMenuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                mobileMenuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ------------------------------------------
    // 2. Language Switching: Persian / English
    // ------------------------------------------

    const translations = {
        fa: {
            "nav-home": "خانه",
            "nav-about": "درباره ما",
            "nav-services": "خدمات",
            "nav-articles": "مقالات",
            "nav-contact": "تماس با ما",
            "hero-title": "سلامتی شما، اولویت ماست",
            "hero-description":
                "با تغذیه اصولی و سبک زندگی سالم، به نسخه بهتر خودتان تبدیل شوید.",
            "hero-button": "مشاهده خدمات",
            "about-title": "درباره تندرست",
            "about-description":
                "ما به شما کمک می‌کنیم با انتخاب‌های غذایی آگاهانه، عادت‌های سالم و برنامه‌ای متناسب با نیازهایتان، مسیر سلامتی را با اطمینان طی کنید.",
            "services-title": "خدمات ما",
            "service-one-title": "مشاوره تغذیه",
            "service-one-description":
                "راهنمایی برای انتخاب غذاهای سالم و ایجاد عادت‌های غذایی پایدار.",
            "service-two-title": "برنامه غذایی شخصی",
            "service-two-description":
                "برنامه غذایی متناسب با اهداف، ترجیحات و سبک زندگی شما.",
            "service-three-title": "سلامتی و سبک زندگی",
            "service-three-description":
                "راهکارهایی برای بهبود عادت‌های روزانه، انرژی و کیفیت زندگی.",
            "articles-title": "مقالات و مطالب آموزشی",
            "contact-title": "با ما در ارتباط باشید",
            "contact-description":
                "برای دریافت اطلاعات بیشتر درباره خدمات ما، پیام خود را ارسال کنید.",
            "form-name": "نام و نام خانوادگی",
            "form-email": "ایمیل",
            "form-message": "پیام شما",
            "form-submit": "ارسال پیام",
            "footer-text": "تندرست؛ همراه شما در مسیر زندگی سالم."
        },

        en: {
            "nav-home": "Home",
            "nav-about": "About",
            "nav-services": "Services",
            "nav-articles": "Articles",
            "nav-contact": "Contact",
            "hero-title": "Your Health Is Our Priority",
            "hero-description":
                "Build a healthier version of yourself through balanced nutrition and a healthy lifestyle.",
            "hero-button": "Explore Services",
            "about-title": "About Tandorost",
            "about-description":
                "We help you make informed food choices, develop healthy habits, and follow a wellness journey tailored to your needs.",
            "services-title": "Our Services",
            "service-one-title": "Nutrition Consulting",
            "service-one-description":
                "Guidance for healthier food choices and sustainable eating habits.",
            "service-two-title": "Personalized Meal Plans",
            "service-two-description":
                "Meal plans tailored to your goals, preferences, and lifestyle.",
            "service-three-title": "Wellness & Lifestyle",
            "service-three-description":
                "Practical ideas to improve daily habits, energy, and quality of life.",
            "articles-title": "Articles & Resources",
            "contact-title": "Get in Touch",
            "contact-description":
                "Contact us to learn more about our services.",
            "form-name": "Full Name",
            "form-email": "Email Address",
            "form-message": "Your Message",
            "form-submit": "Send Message",
            "footer-text": "Tandorost — Your partner in healthy living."
        }
    };

    function setLanguage(language) {
        const selectedLanguage = translations[language]
            ? language
            : "fa";

        document.documentElement.lang = selectedLanguage;
        document.documentElement.dir =
            selectedLanguage === "fa" ? "rtl" : "ltr";

        document.body.classList.toggle(
            "language-persian",
            selectedLanguage === "fa"
        );

        document.body.classList.toggle(
            "language-english",
            selectedLanguage === "en"
        );

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
            const key = element.getAttribute("data-i18n");
            const translatedText = translations[selectedLanguage][key];

            if (translatedText) {
                element.textContent = translatedText;
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(
            function (element) {
                const key = element.getAttribute("data-i18n-placeholder");
                const translatedText = translations[selectedLanguage][key];

                if (translatedText) {
                    element.placeholder = translatedText;
                }
            }
        );

        if (languageButton) {
            languageButton.textContent =
                selectedLanguage === "fa" ? "EN" : "فا";

            languageButton.setAttribute(
                "aria-label",
                selectedLanguage === "fa"
                    ? "Switch to English"
                    : "تغییر زبان به فارسی"
            );
        }

        try {
            localStorage.setItem("tandorost-language", selectedLanguage);
        } catch (error) {
            // The website can still work if storage is unavailable.
        }
    }

    if (languageButton) {
        languageButton.addEventListener("click", function () {
            const currentLanguage =
                document.documentElement.lang === "en" ? "en" : "fa";

            setLanguage(currentLanguage === "fa" ? "en" : "fa");
        });
    }

    // ------------------------------------------
    // 3. Restore the Last Selected Language
    // ------------------------------------------

    let savedLanguage = "fa";

    try {
        savedLanguage = localStorage.getItem("tandorost-language") || "fa";
    } catch (error) {
        savedLanguage = "fa";
    }

    setLanguage(savedLanguage);

    // ------------------------------------------
    // 4. Contact Form Validation
    // ------------------------------------------

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const nameField = contactForm.querySelector(
                '[name="name"], #name'
            );

            const emailField = contactForm.querySelector(
                '[name="email"], #email'
            );

            const messageField = contactForm.querySelector(
                '[name="message"], #message'
            );

            const name = nameField ? nameField.value.trim() : "";
            const email = emailField ? emailField.value.trim() : "";
            const message = messageField
                ? messageField.value.trim()
                : "";

            if (!name || !email || !message) {
                alert(
                    document.documentElement.lang === "en"
                        ? "Please complete all fields."
                        : "لطفاً تمام فیلدها را تکمیل کنید."
                );
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert(
                    document.documentElement.lang === "en"
                        ? "Please enter a valid email address."
                        : "لطفاً یک آدرس ایمیل معتبر وارد کنید."
                );
                return;
            }

            // Replace this placeholder with your actual business email.
            const businessEmail = "hello@example.com";

            const subject = encodeURIComponent(
                "Website inquiry from " + name
            );

            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            const mailtoLink =
                "mailto:" + businessEmail +
                "?subject=" + subject +
                "&body=" + body;

            const successMessage =
                document.documentElement.lang === "en"
                    ? "Your email application will open so you can send your message."
                    : "برنامه ایمیل شما باز می‌شود تا پیام را ارسال کنید.";

            alert(successMessage);
            window.location.href = mailtoLink;
        });
    }

    // ------------------------------------------
    // 5. Dynamic Copyright Year
    // ------------------------------------------

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ------------------------------------------
    // 6. Smooth Scrolling for Internal Links
    // ------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
```
