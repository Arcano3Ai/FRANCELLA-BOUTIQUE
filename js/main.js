/**
 * FRANCELLA COLLECTION - Boutique de Moda Femenina
 * Front-end Interaction & UI Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initSearchModal();
    initCartDrawer();
    initWishlist();
    initQuickView();
    initSmoothScroll();
    initAmbientMusic();
    initVideoIntroModal();
    initChicCursor();
});

/* ==========================================================================
   1. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("mobile-close-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!menuBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add("active");
        menuBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        mobileMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

/* ==========================================================================
   2. Search Modal Overlay
   ========================================================================== */
function initSearchModal() {
    const searchToggle = document.getElementById("btn-search-toggle");
    const searchOverlay = document.getElementById("search-overlay");
    const searchClose = document.getElementById("search-close-btn");
    const searchInput = document.getElementById("search-input");
    const quickTags = document.querySelectorAll(".quick-tag");

    if (!searchToggle || !searchOverlay) return;

    function openSearch() {
        searchOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    searchToggle.addEventListener("click", openSearch);
    if (searchClose) searchClose.addEventListener("click", closeSearch);

    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) closeSearch();
    });

    quickTags.forEach(tag => {
        tag.addEventListener("click", closeSearch);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });
}

/* ==========================================================================
   3. Cart Drawer & Bag State
   ========================================================================== */
function initCartDrawer() {
    const cartToggle = document.getElementById("btn-cart-toggle");
    const cartOverlay = document.getElementById("cart-drawer-overlay");
    const cartClose = document.getElementById("cart-drawer-close");
    const continueShopping = document.getElementById("btn-continue-shopping");

    if (!cartToggle || !cartOverlay) return;

    function openCart() {
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    cartToggle.addEventListener("click", openCart);
    if (cartClose) cartClose.addEventListener("click", closeCart);
    if (continueShopping) continueShopping.addEventListener("click", closeCart);

    cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) closeCart();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartOverlay.classList.contains("active")) {
            closeCart();
        }
    });
}

/* ==========================================================================
   4. Wishlist Toggle & Counter
   ========================================================================== */
function initWishlist() {
    const wishlistBadge = document.getElementById("wishlist-badge");
    const wishlistBtns = document.querySelectorAll(".product-wishlist-btn");
    let wishlistCount = 0;

    wishlistBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("active");

            if (btn.classList.contains("active")) {
                wishlistCount++;
            } else {
                wishlistCount = Math.max(0, wishlistCount - 1);
            }

            if (wishlistBadge) {
                wishlistBadge.textContent = wishlistCount;
                wishlistBadge.style.transform = "scale(1.3)";
                setTimeout(() => {
                    wishlistBadge.style.transform = "scale(1)";
                }, 200);
            }
        });
    });
}

/* ==========================================================================
   5. Quick View Modal
   ========================================================================== */
function initQuickView() {
    const qvModal = document.getElementById("quickview-modal");
    const qvClose = document.getElementById("quickview-close-btn");
    const qvImg = document.getElementById("qv-img");
    const qvTitle = document.getElementById("qv-title");
    const qvPrice = document.getElementById("qv-price");
    const qvOldPrice = document.getElementById("qv-old-price");
    const qvBadge = document.getElementById("qv-badge");
    const qvAddBtn = document.getElementById("qv-add-cart-btn");
    const cartBadge = document.getElementById("cart-badge");
    const cartDrawerCount = document.getElementById("cart-drawer-count");
    const cartOverlay = document.getElementById("cart-drawer-overlay");

    if (!qvModal) return;

    function openModal(data) {
        if (qvImg && data.img) qvImg.src = data.img;
        if (qvTitle && data.name) qvTitle.textContent = data.name;
        if (qvPrice && data.price) qvPrice.textContent = data.price + " MXN";
        
        if (qvOldPrice) {
            if (data.oldprice) {
                qvOldPrice.textContent = data.oldprice + " MXN";
                qvOldPrice.style.display = "inline";
            } else {
                qvOldPrice.style.display = "none";
            }
        }

        if (qvBadge) {
            if (data.badge) {
                qvBadge.textContent = data.badge;
                qvBadge.style.display = "inline-block";
            } else {
                qvBadge.style.display = "none";
            }
        }

        qvModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        qvModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Attach to product cards and quickview buttons
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        const btn = card.querySelector(".product-quickview-btn");
        const data = {
            name: card.dataset.name,
            price: card.dataset.price,
            oldprice: card.dataset.oldprice,
            badge: card.dataset.badge,
            img: card.dataset.img
        };

        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                openModal(data);
            });
        }

        // On mobile, tap on image box also opens quickview
        const imgBox = card.querySelector(".product-img-box");
        if (imgBox) {
            imgBox.addEventListener("click", (e) => {
                if (window.innerWidth <= 768 && !e.target.closest(".product-wishlist-btn")) {
                    openModal(data);
                }
            });
        }
    });

    // Size selector buttons in modal
    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Add to cart from modal
    if (qvAddBtn) {
        qvAddBtn.addEventListener("click", () => {
            let currentCount = parseInt(cartBadge ? cartBadge.textContent : "2", 10) || 0;
            currentCount++;
            if (cartBadge) cartBadge.textContent = currentCount;
            if (cartDrawerCount) cartDrawerCount.textContent = currentCount;

            closeModal();
            if (cartOverlay) {
                cartOverlay.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    }

    if (qvClose) qvClose.addEventListener("click", closeModal);

    qvModal.addEventListener("click", (e) => {
        if (e.target === qvModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && qvModal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. Smooth Anchor Navigation & Header Shadow
   ========================================================================== */
function initSmoothScroll() {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.06)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }, { passive: true });
}

/* ==========================================================================
   7. Ambient Boutique Music Controller (Autoplay + Pause/Play Sync)
   ========================================================================== */
let globalAmbientAudio = null;
let isAudioManuallyPaused = false;

function initAmbientMusic() {
    const audio = document.getElementById("ambient-audio");
    if (!audio) return;
    globalAmbientAudio = audio;

    // UI elements
    const headerBtn = document.getElementById("audio-toggle-btn");
    const headerLabel = headerBtn ? headerBtn.querySelector(".audio-status-text") : null;
    const floatingBtn = document.getElementById("floating-music-btn");
    const floatingLabel = document.getElementById("floating-status-text");

    audio.volume = 0.65; // Volumen ideal de boutique

    function setUIState(isPlaying) {
        if (headerBtn) {
            if (isPlaying) {
                headerBtn.classList.remove("is-paused");
                headerBtn.classList.add("is-playing");
                headerBtn.setAttribute("title", "Pausar música");
                if (headerLabel) headerLabel.textContent = "Pausar";
            } else {
                headerBtn.classList.remove("is-playing");
                headerBtn.classList.add("is-paused");
                headerBtn.setAttribute("title", "Reproducir música");
                if (headerLabel) headerLabel.textContent = "Música";
            }
        }

        if (floatingBtn) {
            if (isPlaying) {
                floatingBtn.classList.remove("is-paused");
                floatingBtn.classList.add("is-playing");
                floatingBtn.setAttribute("title", "Pausar música Boutique Vibe");
                if (floatingLabel) floatingLabel.textContent = "Reproduciendo";
            } else {
                floatingBtn.classList.remove("is-playing");
                floatingBtn.classList.add("is-paused");
                floatingBtn.setAttribute("title", "Reproducir música Boutique Vibe");
                if (floatingLabel) floatingLabel.textContent = "Pausado";
            }
        }
    }

    function playMusic() {
        isAudioManuallyPaused = false;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setUIState(true);
            }).catch(() => {
                // Si el navegador bloquea el autoplay sin interacción, mostrar UI en espera
                setUIState(false);
            });
        }
    }

    function pauseMusic() {
        isAudioManuallyPaused = true;
        audio.pause();
        setUIState(false);
    }

    function toggleMusic() {
        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }

    if (headerBtn) headerBtn.addEventListener("click", toggleMusic);
    if (floatingBtn) floatingBtn.addEventListener("click", toggleMusic);

    // Exponer playMusic globalmente para coordinar con el video
    window.startAmbientMusic = playMusic;

    // Si el video de inicio está activo al cargar, esperar a que el usuario entre a la tienda
    const videoOverlay = document.getElementById("video-intro-overlay");
    const isVideoOverlayActive = videoOverlay && videoOverlay.classList.contains("active");

    if (!isVideoOverlayActive) {
        // Intentar reproducción automática inmediata si no hay video activo
        playMusic();
    }

    // Fallback: Si el navegador bloqueó el autoplay unmuted, iniciar al primer toque/clic en cualquier parte
    const startOnUserGesture = () => {
        const videoActive = videoOverlay && videoOverlay.classList.contains("active");
        if (!videoActive && !isAudioManuallyPaused && audio.paused) {
            playMusic();
        }
    };

    window.addEventListener("click", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("touchstart", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", startOnUserGesture, { once: true, passive: true });
    window.addEventListener("scroll", startOnUserGesture, { once: true, passive: true });
}

/* ==========================================================================
   8. Video Intro Pop-Up Modal (Al Inicio + Audio Sync)
   ========================================================================== */
function initVideoIntroModal() {
    const videoOverlay = document.getElementById("video-intro-overlay");
    const introVideo = document.getElementById("intro-video");
    const closeBtn = document.getElementById("close-intro-btn");
    const enterBtn = document.getElementById("enter-boutique-btn");
    const openBtns = document.querySelectorAll(".btn-watch-intro");

    if (!videoOverlay || !introVideo) return;

    let wasMusicPlayingBeforeVideo = false;

    // Si el modal está activo al inicio, reproducir el video de bienvenida
    if (videoOverlay.classList.contains("active")) {
        document.body.style.overflow = "hidden";
        introVideo.currentTime = 0;
        introVideo.play().catch(() => {
            // Si las políticas de reproducción automática requieren silencio inicial:
            introVideo.muted = true;
            introVideo.play().catch(() => {});
        });
    }

    function openVideoModal() {
        // Pausar música ambiental si estaba sonando
        if (globalAmbientAudio && !globalAmbientAudio.paused) {
            wasMusicPlayingBeforeVideo = true;
            globalAmbientAudio.pause();
            const headerBtn = document.getElementById("audio-toggle-btn");
            const floatingBtn = document.getElementById("floating-music-btn");
            if (headerBtn) {
                headerBtn.classList.remove("is-playing");
                headerBtn.classList.add("is-paused");
            }
            if (floatingBtn) {
                floatingBtn.classList.remove("is-playing");
                floatingBtn.classList.add("is-paused");
            }
        } else {
            wasMusicPlayingBeforeVideo = false;
        }

        videoOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        introVideo.muted = false;
        introVideo.currentTime = 0;
        introVideo.play().catch(() => {});
    }

    function closeVideoModal() {
        introVideo.pause();
        introVideo.currentTime = 0;
        videoOverlay.classList.remove("active");
        document.body.style.overflow = "";

        // Iniciar o reanudar la música ambiental de boutique
        if (!isAudioManuallyPaused && globalAmbientAudio) {
            if (window.startAmbientMusic) {
                window.startAmbientMusic();
            } else {
                globalAmbientAudio.play().catch(() => {});
            }
        }
    }

    openBtns.forEach(btn => {
        btn.addEventListener("click", openVideoModal);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
    if (enterBtn) enterBtn.addEventListener("click", closeVideoModal);

    videoOverlay.addEventListener("click", (e) => {
        if (e.target === videoOverlay) closeVideoModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoOverlay.classList.contains("active")) {
            closeVideoModal();
        }
    });

    // Al terminar el video de bienvenida, entrar a la tienda y comenzar la música
    introVideo.addEventListener("ended", () => {
        closeVideoModal();
    });
}

/* ==========================================================================
   9. Chic Glamour Cursor & Sparkle Magic Trail Controller
   ========================================================================== */
function initChicCursor() {
    // Si el dispositivo no tiene mouse de precisión (móviles/tablets), no inicializar
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    const dot = document.getElementById("chic-cursor-dot");
    const ring = document.getElementById("chic-cursor-ring");
    const container = document.getElementById("chic-sparkles-container");

    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let lastSparkleTime = 0;

    const sparkleIcons = ["✨", "✦", "✧", "💖", "🌸", "♡"];

    // Render loop fluido con lerp para el ring
    function renderCursor() {
        if (isVisible) {
            // Lerp easing sutil
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;

            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;

            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
        }

        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Crear partículas mágicas de destellos al mover el puntero
    function createSparkle(x, y, isBurst = false) {
        if (!container) return;

        const sparkle = document.createElement("span");
        sparkle.className = "chic-sparkle-particle";
        const icon = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
        sparkle.textContent = icon;

        // Variación aleatoria
        const offsetX = (Math.random() - 0.5) * (isBurst ? 45 : 18);
        const offsetY = (Math.random() - 0.5) * (isBurst ? 45 : 18);
        const randomSize = isBurst ? (0.9 + Math.random() * 0.5) : (0.65 + Math.random() * 0.4);

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;
        sparkle.style.fontSize = `${randomSize}rem`;

        container.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 750);
    }

    // Movimiento del cursor
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = "1";
            ring.style.opacity = "1";
            ringX = mouseX;
            ringY = mouseY;
        }

        // Throttle para generar destellos etéreos
        const now = performance.now();
        if (now - lastSparkleTime > 55) {
            createSparkle(mouseX, mouseY);
            lastSparkleTime = now;
        }
    }, { passive: true });

    // Clic / Presión
    window.addEventListener("mousedown", (e) => {
        ring.classList.add("cursor-active");
        dot.classList.add("cursor-active");

        // Ráfaga chic de 4 destellos
        for (let i = 0; i < 4; i++) {
            createSparkle(e.clientX, e.clientY, true);
        }
    });

    window.addEventListener("mouseup", () => {
        ring.classList.remove("cursor-active");
        dot.classList.remove("cursor-active");
    });

    // Detectar cuando el cursor entra y sale de la ventana
    document.addEventListener("mouseleave", () => {
        isVisible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
    });

    // Hover interactivo sobre botones, enlaces y productos
    const interactiveSelector = "a, button, input, [role='button'], .product-card, .category-card, .insta-item, .size-btn, .quick-tag";

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelector)) {
            ring.classList.add("cursor-hover");
            dot.classList.add("cursor-hover");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelector)) {
            ring.classList.remove("cursor-hover");
            dot.classList.remove("cursor-hover");
        }
    });
}
